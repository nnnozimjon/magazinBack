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

const Customers = { ...register, ...login }

export default Customers
