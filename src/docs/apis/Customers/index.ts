const register = {
  '/api/v1/customers/register': {
    post: {
      tags: ['Customers'],
      summary: 'Customer registration!',
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
          name: 'username',
          in: 'query',
          type: 'string',
        },

        {
          name: 'password',
          in: 'query',
          type: 'string',
        },
      ],
      responses: {},
    },
  },
}

const login = {
  '/api/v1/customers/login': {
    post: {
      tags: ['Customers'],
      summary: 'Customers login form',
      parameters: [
        {
          name: 'email',
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

const getProducts = {
  '/api/v1/market/products/get-all-products': {
    get: {
      tags: ['Customers'],
      summary: 'Customers login form',
      parameters: [
        {
          name: 'page',
          in: 'query',
          type: 'number',
        },
        {
          name: 'pageSize',
          in: 'query',
          type: 'number',
        },
        {
          name: 'userId',
          in: 'query',
          type: 'string',
        },
        {
          name: 'productName',
          in: 'query',
          type: 'string',
        },
        {
          name: 'category',
          in: 'query',
          type: 'string',
        },
        {
          name: 'premium',
          in: 'query',
          type: 'boolean',
        },
        {
          name: 'minPrice',
          in: 'query',
          type: 'number',
        },
        {
          name: 'maxPrice',
          in: 'query',
          type: 'number',
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
      ],
      responses: {},
    },
  },
}
const Customers = { ...register, ...login, ...getProducts }

export default Customers
