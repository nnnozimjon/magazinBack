const productAndWishlist = {
  '/api/v1/market/products/product-and-wishlist': {
    post: {
      tags: ['Wishlists'],
      summary: 'Wishlist product code!',
      parameters: [
        {
          name: 'productId',
          in: 'query',
          type: 'string',
        },
      ],
      responses: {},
    },
  },
}

const Wishlist = {
  ...productAndWishlist,
}

export default Wishlist
