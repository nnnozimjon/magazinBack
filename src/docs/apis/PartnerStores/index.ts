const register = {
  '/partnerStores/register': {
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
  '/partnerStores/login': {
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
  '/partnerStore/createProduct': {
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
  '/partnerStore/editProduct': {
    post: {
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
  '/partnerStore/deleteProduct': {
    post: {
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

const PartnerStores = {
  ...register,
  ...login,
  ...createProduct,
  ...editProduct,
  ...deleteProduct,
}
export default PartnerStores
