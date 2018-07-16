
exports.install = function (Vue, options) {
  Vue.prototype.contains = function (arr, obj) {
    var i = arr.length
        while (i--) {
      if (arr[i] === obj) {
        return true
            }
    }
    return false
    };
}
