const Api = {
  auth: {
    // Client
    loginCustomer: '/api/v1/customers/login',
    registerCustomer: '/api/v1/customers/register',

    // Affiliate
    loginAffiliate: '/api/v1/affiliates/login',
    registerAffiliate: '/api/v1/affiliates/register',

    // Store
    loginPartnerStore: '/api/v1/partnerStores/login',
    registerPartnerStore: '/api/v1/partnerStores/register',
  },

  dashboard: {
    partnerStores: {
      soldProductsCount: '/api/v1/dashboard/partnerStores/sold-products-count',
      soldProductsPrice: '/api/v1/dashboard/partnerStores/sold-products-price',
    },
  },

  product: {
    partnerStore: {
      createProduct: '/api/v1/product/partnerStore/create-product',
      editProduct: '/api/v1/product/partnerStore/edit-product',
      deleteProduct: '/api/v1/product/partnerStore/delete-product',
      getProducts: '/api/v1/product/partnerStore/get-products',
    },
  },
}

export default Api
