export default item => {
  return Object.prototype.toString.call(item) === '[object Object]'
}
