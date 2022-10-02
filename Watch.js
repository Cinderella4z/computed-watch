class Watcher {
  constructor() {
    this.watches = []
  }

  addWatcher (key, fn) {
    this.watches.push({
      key,
      fn
    })
  }

  invoke (key, newV, oldV) {
    for (let i of this.watches) {
      if (i['key'] === key) {
        i.fn(newV, oldV);
      }
    }
  }



}
export default Watcher