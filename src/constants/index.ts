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

  product: {
    partnerStore: {
      createProduct: '/api/v1/product/partnerStore/createProduct',
    },
  },
}

export default Api
