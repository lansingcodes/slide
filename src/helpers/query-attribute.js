import QueryString from 'query-string'

export default name => {
  return {
    getValue () {
      return QueryString.parse(window.location.search)[name]
    },
    setValue (newValue) {
      const params = QueryString.parse(window.location.search)
      if (newValue === null) {
        delete params[name]
      } else {
        params[name] = newValue
      }
      window.history.replaceState({}, document.title,
        window.location.origin +
        window.location.pathname +
        (Object.keys(params).length > 0 ? '?' : '') +
        QueryString.stringify(params) +
        window.location.hash
      )
    }
  }
}
