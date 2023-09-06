declare namespace IStoreProduct {
  interface createProduct {
    name: string
    description: string
    price: number
    categoryId: number
    color?: string[]
    size: number[] | string[]
  }
}
