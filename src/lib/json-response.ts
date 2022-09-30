export const formatJSONResponse = (code: number, response) => {
  return {
    statusCode: code,
    body: JSON.stringify(response)
  }
}
