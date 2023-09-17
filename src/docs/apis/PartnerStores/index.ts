const register = {
  '/api/v1/partner-stores/register': {
    post: {
      tags: ['PartnerStores'],
      summary: 'Partner stores registration!',
      consumes: 'multipart/form-data',
      parameters: [
        {
          name: 'email',
          in: 'query',
          type: 'string',
        },
        {
          name: 'phoneNumber',
          in: 'query',
          type: 'string',
        },
        {
          name: 'storeName',
          in: 'query',
          type: 'string',
        },
        {
          name: 'username',
          in: 'query',
          type: 'string',
        },
        {
          name: 'city',
          in: 'query',
          type: 'string',
        },
        {
          name: 'storeAddress',
          in: 'query',
          type: 'string',
        },
        {
          name: 'password',
          in: 'query',
          type: 'string',
        },
        {
          name: 'acceptTerms',
          in: 'query',
          type: 'boolean',
        },
        {
          name: 'storeBrandLogo',
          in: 'file',
          type: 'multipart/form-data',
        },
        {
          name: 'storeHeaderPhoto',
          in: 'file',
          type: 'multipart/form-data',
        },
      ],
      responses: {},
    },
  },
}

const login = {
  '/api/v1/partner-stores/login': {
    post: {
      tags: ['PartnerStores'],
      summary: 'Partner Stores login form',
      parameters: [
        {
          name: 'storeName',
          in: 'body',
          type: 'string',
        },
        {
          name: 'password',
          in: 'body',
          type: 'string',
        },
      ],
      responses: {},
    },
  },
}

const createProduct = {
  '/api/v1/partner-store/product/create-product': {
    post: {
      tags: ['PartnerStores'],
      summary: 'Create product',
      consumes: 'multipart/form-data',
      parameters: [
        {
          name: 'name',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'description',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'price',
          in: 'query',
          type: 'number', // Assuming price is a number
          required: true,
        },
        {
          name: 'category',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'color',
          in: 'query',
          type: 'string',
        },
        {
          name: 'size',
          in: 'query',
          type: 'string',
        },
        {
          name: 'stockQuantity',
          in: 'query',
          type: 'number', // Assuming stockQuantity is a number
          required: true,
        },
        {
          name: 'discount',
          in: 'query',
          type: 'number', // Assuming discount is a number
        },
        {
          name: 'file',
          in: 'form-data',
          type: 'file',
          required: true,
          description: 'Upload file',
        },
      ],
      responses: {},
    },
  },
}

const editProduct = {
  '/api/v1/partner-store/product/edit-product': {
    put: {
      tags: ['PartnerStores'],
      summary: 'Edit product!',
      consumes: 'multipart/form-data',
      parameters: [
        {
          name: 'id',
          in: 'params',
          type: 'string',
          required: true,
        },
        {
          name: 'name',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'description',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'price',
          in: 'query',
          type: 'number', // Assuming price is a number
          required: true,
        },
        {
          name: 'category',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'color',
          in: 'query',
          type: 'string',
        },
        {
          name: 'size',
          in: 'query',
          type: 'string',
        },
        {
          name: 'stockQuantity',
          in: 'query',
          type: 'number', // Assuming stockQuantity is a number
          required: true,
        },
        {
          name: 'discount',
          in: 'query',
          type: 'number', // Assuming discount is a number
        },
      ],
      responses: {},
    },
  },
}

const deleteProduct = {
  '/api/v1/partner-store/product/delete-product/?id=': {
    delete: {
      tags: ['PartnerStores'],
      summary: 'Delete Product!',
      consumes: 'multipart/form-data',
      parameters: [
        {
          name: 'id',
          in: 'params',
          type: 'string',
          required: true,
        },
      ],
      responses: {},
    },
  },
}

const getProducts = {
  '/api/v1/partner-store/product/get-all-products': {
    get: {
      tags: ['PartnerStores'],
      summary: 'Get products!',
      parameters: {},
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Успешно',
                payload: [
                  {
                    productId: 'number',
                    productName: 'string',
                    description: 'string',
                    price: 'number',
                    stockQuantity: 'number',
                    images: [
                      'https://dev-dushanbemarket.com/api/v1/partner-store/product/images/example.png',
                      'https://dev-dushanbemarket.com/api/v1/partner-store/product/images/example.jpg',
                    ],
                    size: 'string',
                    color: 'string',
                    discount: 'number',
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
}

const getStoreData = {
  '/api/v1/partner-store/profile/user-data': {
    get: {
      tags: ['PartnerStores'],
      summary: 'Get user Product!',
      consumes: 'multipart/form-data',
      parameters: {},
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Успешно',
                payload: {
                  storeId: 'number',
                  storeName: 'string',
                  userName: 'string',
                  email: 'string',
                  phoneNumber: 'string',
                  brandIconUrl:
                    'https://dev-dushanbemarket.com/api/v1/partner-store/product/images/example.png',
                  headerPhotoUrl:
                    'https://dev-dushanbemarket.com/api/v1/partner-store/product/images/example.png',
                  cityAddress: 'string',
                  storeAddress: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
}

const editStore = {
  '/api/v1/partner-store/profile/edit-store': {
    put: {
      tags: ['PartnerStores'],
      summary: 'Edit Store Data!',
      parameters: [
        {
          name: 'userName',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'storeName',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'email',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'phoneNumber',
          in: 'query',
          type: 'number', // Assuming price is a number
          required: true,
        },
        {
          name: 'cityAddress',
          in: 'query',
          type: 'string',
          required: true,
        },
        {
          name: 'storeAddress',
          in: 'query',
          type: 'string',
        },
      ],
      responses: {},
    },
  },
}

const deleteStore = {
  '/api/v1/partner-store/profile/delete-store': {
    delete: {
      tags: ['PartnerStores'],
      summary: 'Delete Store!',
      consumes: 'multipart/form-data',
      parameters: {},
      responses: {
        '200': {
          description: 'success',
          content: {
            'application/json': {
              example: {
                code: 200,
                message: 'Магазин успешно удален!',
              },
            },
          },
        },
        '404': {
          description: 'warning',
          content: {
            'application/json': {
              example: {
                code: 404,
                message: 'Магазин не найден!',
              },
            },
          },
        },
        '500': {
          description: 'failed',
          content: {
            'application/json': {
              example: {
                code: 500,
                message: 'Внутренняя ошибка сервера!',
              },
            },
          },
        },
      },
    },
  },
}

const PartnerStores = {
  ...register,
  ...login,
  ...getStoreData,
  ...editStore,
  ...deleteStore,
  ...createProduct,
  ...editProduct,
  ...deleteProduct,
  ...getProducts,
}
export default PartnerStores
