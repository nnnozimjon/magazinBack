function createObjectFromParams(url: string): Record<string, string> {
  const params = new URLSearchParams(url)

  const paramObject: Record<string, string> = {}

  params.forEach((value, key) => {
    paramObject[key] = value
  })

  return paramObject
}

export default createObjectFromParams
