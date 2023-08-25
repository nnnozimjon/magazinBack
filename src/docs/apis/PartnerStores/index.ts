const register = {
  '/api/partnerStores/register': {
    post: {
      tags: ['PartnerStores'],
      summary: 'Partner stores registration!',
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
      ],
      responses: {},
    },
  },
}

const PartnerStores = {
  ...register,
}
export default PartnerStores
