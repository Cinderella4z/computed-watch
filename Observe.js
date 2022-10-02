function Observe (obj, key, value, getCb, setCb) {
  Object.defineProperty(obj, key, {

    get () {
      getCb && getCb();
      return value
    },
    set (nValue) {

      if (nValue !== value) {
        obj.$watch(key, nValue, value)
        value = nValue
        setCb && setCb();
      }

    }

  })


}
export default Observe