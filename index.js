import Observe from './Observe.js'
import Computed from './Computed.js'
import Watcher from './Watch.js'
class MVVM {
  constructor(options) {
    this.$options = options
    this.el = document.querySelector(options.el)
    this.$data = options.data()
    this.init()
  }
  init () {
    this.initData()
    this.initComputed()
    this.initWatcher()
  }
  initData () {
    for (let k in this.$data) {
      Observe(this, k, this.$data[k],
        null,
        () => {
          this.$computed.dep.forEach(item => item.updata(k))
        }
      )
    }
  }
  initComputed () {
    const computedIns = new Computed(this, this.$options.computed)
    this.$computed = computedIns
  }
  initWatcher () {
    const watcher = new Watcher()
    for (let k in this.$options.watch) {
      watcher.addWatcher(k, this.$options.watch[k].bind(this))
    }
    this.$watch = watcher.invoke.bind(watcher)
  }
}

export default MVVM