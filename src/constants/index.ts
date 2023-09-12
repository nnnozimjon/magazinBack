const Api = {
  auth: {
    // Client
    loginCustomer: '/api/v1/customers/login',
    registerCustomer: '/api/v1/customers/register',

    // Affiliate
    loginAffiliate: '/api/v1/affiliates/login',
    registerAffiliate: '/api/v1/affiliates/register',

    // Store
    loginPartnerStore: '/api/v1/partner-stores/login',
    registerPartnerStore: '/api/v1/partner-stores/register',
  },

  dashboard: {
    partnerStores: {
      soldProductsCount: '/api/v1/dashboard/partner-stores/sold-products-count',
      soldProductsPrice: '/api/v1/dashboard/partner-stores/sold-products-price',
    },
  },

  partnerStore: {
    profile: {
      storeImage: '/api/v1/partner-store/profile/store-image/:image',
    },

    product: {
      createProduct: '/api/v1/partner-store/product/create-product',
      editProduct: '/api/v1/partner-store/product/edit-product',
      deleteProduct: '/api/v1/partner-store/product/delete-product',
      getProducts: '/api/v1/partner-store/product/get-products',
      storeProductImage:
        '/api/v1/partner-store/product/store-product-image/:image',
    },
  },
}

export default Api
