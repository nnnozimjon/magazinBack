const Api = {
  auth: {
    // Client
    loginCustomer: '/api/v1/customers/login',
    registerCustomer: '/api/v1/customers/register',

    // Affiliate
    loginAffiliate: '/api/v1/affiliates/login',
    registerAffiliate: '/api/v1/affiliates/register',

    // Store
    loginPartnerStore: '/api/v1/partner-stores/login', // DONE
    registerPartnerStore: '/api/v1/partner-stores/register', // DONE
  },

  dashboard: {
    partnerStores: {
      soldProductsCount: '/api/v1/dashboard/partner-stores/sold-products-count',
    },
  },

  partnerStore: {
    profile: {
      getStoreData: '/api/v1/partner-store/profile/user-data', // DONE
      storeImage: '/api/v1/partner-store/profile/store-image/:image', // DONE
      editStore: '/api/v1/partner-store/profile/edit-store',
      deleteStore: '/api/v1/partner-store/profile/delete-store',
    },

    product: {
      createProduct: '/api/v1/partner-store/product/create-product',
      editProduct: '/api/v1/partner-store/product/edit-product',
      deleteProduct: '/api/v1/partner-store/product/delete-product', // DONE
      getAllProducts: '/api/v1/partner-store/product/get-all-products', // DONE
      storeProductImage:
        '/api/v1/partner-store/product/store-product-image/:image', // DONE
    },
  },

  market: {
    products: {
      getAllProducts: '/api/v1/market/products/get-all-products',
    },
  },
}

export default Api
