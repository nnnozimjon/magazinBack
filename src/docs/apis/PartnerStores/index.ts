const register = {
  '/api/partnerStores/register': {
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
          in: 'query',
          type: 'multipart/form-data',
        },
        {
          name: 'storeHeaderPhoto',
          in: 'query',
          type: 'multipart/form-data',
        },
      ],
      responses: {},
    },
  },
}

const login = {
  '/api/partnerStores/login': {
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

const PartnerStores = {
  ...register,
  ...login,
}
export default PartnerStores
