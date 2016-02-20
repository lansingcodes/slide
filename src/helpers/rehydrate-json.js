export default json => {
  json = { ...json }
  return json.data.map(item => {
    Object.keys(item.relationships).forEach(relKey => {
      let relValue = item.relationships[relKey]
      if (relValue instanceof Array) {
        item.relationships[relKey] = relValue.map(reference => {
          return json.included[reference.type][reference.id]
        })
      } else {
        item.relationships[relKey] = json.included[relValue.type][relValue.id]
      }
    })
    return item
  })
}
