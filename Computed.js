// 包含所有的computed的类
class Computed {

  constructor(vm, computed) {
    this.dep = []
    for (let k in computed) {
      const item = this.addComputed(vm, computed, k)
      this.initComputed(vm, '_' + k, item)
    }
  }

  initComputed (vm, key, item) {
    Object.defineProperty(vm, key, {
      get () {
        return item.value
      },
      // 使得无法直接修改computed属性
      set () {
        item.value = item.fn()
      }
    })
  }

  addComputed (vm, computed, key) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key)
    const descriptorFn = descriptor.value.get
      ? descriptor.value.get
      : descriptor.value

    const dep = this.collectDep(descriptorFn)
    const Fn = descriptorFn.bind(vm)
    // 这里初始化的时候会调用一次computed
    const value = Fn()
    const res = new DepItem(dep, value, Fn)
    this.dep.push(res)
    return res
  }

  // 通过正则收集所依赖的变量名
  collectDep (fn) {
    const matched = fn.toString().match(/this\.(.?)/g);
    return matched.map(item => item.split('.')[1])
  }
}
// 每个computed所对应的对象
class DepItem {
  constructor(dep, value, fn) {
    this.dep = dep;
    this.value = value;
    this.fn = fn
  }
  updata (key) {
    const _key = this.dep.find(item => item === key)
    if (_key) {
      this.value = this.fn()
    }
  }
}
export default Computed