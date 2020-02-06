#!/usr/bin/env ruby

require 'optparse'
require 'octokit'

CHANGELOG_FILE = 'CHANGELOG.md'
REPO_SLUG = 'realpage-property-os/raul'

github_auth_token = ENV.fetch('GITHUB_API_KEY')

client = Octokit::Client.new(access_token: github_auth_token)
user = client.user
user.login

unless client.scopes.include? 'public_repo' or client.scopes.include? 'repo'
  raise 'Insufficient permissions. Make sure your token contains the repo or public_repo scope.'
end

tag_matched = false
releases = client.releases(REPO_SLUG)
changelog = File.open(CHANGELOG_FILE, 'rb').read

tag, title, body = changelog.scan(/^#\s(v.*?)\s-\s(.*?)\n\n(.*?)^#\s/m).flatten

releases.each do |release|
  if release.tag_name == tag
    tag_matched = true
  end
end

raise 'Missing "v" prefix' unless tag.start_with? 'v'

if tag_matched == true
  puts 'Release tag already exists. If this is in error please verify your CHANGELOG entries'
  Process.exit(0)
end

puts "Logged in as #{user.name}"
puts "Deploying to repo: #{REPO_SLUG}"

# Draft a GitHub release and tag it
client.create_release(REPO_SLUG, tag, {
  target_commitish: 'release',
  name: "#{tag} - #{title}",
  body: body,
})

# Update master
puts `git push origin HEAD:master`
puts `raul deploy`

backport_version, _ = body.scan(/^>\sbackports\s(.*)$/).flatten

# Update master
puts `git push origin HEAD:master` unless backport_version
