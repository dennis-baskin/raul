const http = require('http')
const async = require('async')
const AWS = require('aws-sdk')
const s3 = require('s3')

http.globalAgent.maxSockets = 30

const awsS3Client = new AWS.S3({apiVersion: '2006-03-01'})
AWS.config.update({region: 'us-east-1'})
const s3client = s3.createClient({s3Client: awsS3Client})

const FRAMEWORK_VERSION = require('../util/version')
const FRAMEWORK_VERSION_MINOR = FRAMEWORK_VERSION.replace(/(v\d+\.\d+)\..*/, '$1')

const NAMESPACE = 'raul'
const BUCKET = process.env.AWS_BUCKET
const LOCAL_DEPLOY_DIRECTORY = './dist'

const LIST_OBJECTS_PARAMS = {
  Bucket: BUCKET,
  Delimiter: '/',
  Prefix: `${NAMESPACE}/`,
}

const CONTENT_TYPES = {
  css: 'text/css',
  js: 'text/javascript',
}

const captureVersionOnly = new RegExp('^' + NAMESPACE + '/(.*)/$', 'g')

const uploadPatch = (callback) => upload(callback, FRAMEWORK_VERSION)
const uploadMinor = (callback) => upload(callback, FRAMEWORK_VERSION_MINOR)

const uploadCompressedJSPatch = (cb) => uploadCompressed('js', FRAMEWORK_VERSION, cb)
const uploadCompressedJSMinor = (cb) => uploadCompressed('css', FRAMEWORK_VERSION, cb)
const uploadCompressedCSSPatch = (cb) => uploadCompressed('js', FRAMEWORK_VERSION_MINOR, cb)
const uploadCompressedCSSMinor = (cb) => uploadCompressed('css', FRAMEWORK_VERSION_MINOR, cb)

const upload = (callback, version) => {
  s3client.s3.addExpect100Continue = () => {}

  const uploader = s3client.uploadDir({
    localDir: LOCAL_DEPLOY_DIRECTORY,
    deleteRemoved: true,
    s3Params: {
      ACL: 'public-read',
      Bucket: BUCKET,
      Prefix: `${NAMESPACE}/${version}/`,
    },
  })

  uploader
    .on('error', (err) => {
      console.error(`Unable to sync: `, err.stack)
      callback(err)
    })
    .on('end', () => {
      console.log(`Completed ${version} without errors`)
      callback(null)
    })
}

const getVersions = (callback) => {
  s3client
    .listObjects({s3Params: LIST_OBJECTS_PARAMS})
    .on('error', (err) => callback(err))
    .on('data', (data) => {
      const versions = data.CommonPrefixes.map(prefix => {
        return prefix.Prefix.replace(captureVersionOnly, `$1`)
      })

      console.log('RAUL versions: \n', '\n  ' + versions.join('\n  '))
      callback(null, versions)
    })
}

const uploadCompressed = (type, version, callback) => {
  s3client.s3.addExpect100Continue = () => {}

  const file = `./dist/${type}/raul.min.gz.${type}`
  const keyPrefix = `${NAMESPACE}/${version}/`
  const key = `${keyPrefix}${type}/raul.min.gz.${type}`

  const options = {
    localFile: file,
    deleteRemoved: true,
    s3Params: {
      ACL: 'public-read',
      Bucket: BUCKET,
      ContentEncoding: 'gzip',
      ContentType: CONTENT_TYPES[type],
      Key: key,
    },
  }

  const uploader = s3client.uploadFile(options)

  uploader
    .on('error', (err) => {
      console.error(`Unable to sync: `, err.stack)
      callback(err)
    })
    .on('end', () => {
      console.log(`Completed uploading '${file}' without errors`)
      callback(null)
    })
}

const builder = Object.freeze({})

const handler = (args) => {
  async.series({
    versions: getVersions,
    uploadPatch: uploadPatch,
    uploadMinor: uploadMinor,
    uploadCompressedJSPatch: uploadCompressedJSPatch,
    uploadCompressedJSMinor: uploadCompressedJSMinor,
    uploadCompressedCSSPatch: uploadCompressedCSSPatch,
    uploadCompressedCSSMinor: uploadCompressedCSSMinor,
  }, (error, {versions}) => {
    if (error) return console.log(error)
  })
}

module.exports = {
  command: ['deploy', 'd'],
  describe: 'Deploys dist directory to AWS RAUL repo',
  builder: builder,
  handler: handler,
}
