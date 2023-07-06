export const getQueryStringVariable = (variable: string) =>
  new URLSearchParams(window.location.search).get(variable)
