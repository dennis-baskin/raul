const addRef = (el, binding, vnode) => {
  const ref = binding.arg
  const vm = vnode.context

  if (!vm.$refs.hasOwnProperty(ref)) vm.$refs[ref] = []

  const index = vm.$refs[ref].indexOf(el)

  if (index === -1) vnode.context.$refs[ref].push(el)
}

const removeRef = (el, {arg: ref}, {context: vm}) => {
  if (vm.$refs.hasOwnProperty(ref)) {
    const arr = vm.$refs[ref]
    const index = arr.indexOf(el)

    if (index) arr.splice(index, 1)
  }
}

export default (Vue) => {
  Vue.directive('refs', {
    bind: addRef,
    update: addRef,
    unbind: removeRef,
  })
}
