import QueryString from 'query-string'

export default (name) => {
  return {
    getValue () {
      return QueryString.parse(window.location.search)[name]
    },
    setValue (newValue) {
      const params = QueryString.parse(window.location.search)
      params[name] = newValue
      window.history.replaceState({}, document.title,
        window.location.origin +
        window.location.pathname +
        '?' +
        QueryString.stringify(params) +
        window.location.hash
      )
    }
  }
}
