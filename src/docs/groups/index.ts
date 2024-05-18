import { SwaggerDefinition } from 'swagger-jsdoc'

const ApiGroups: SwaggerDefinition['tags'] = [
  {
    name: 'Affiliates',
    description: 'Operation related to Authentication',
  },
  {
    name: 'CartItems',
    description: 'Operation related to CartItems',
  },
  {
    name: 'Categories',
    description: 'Operation related to Categories',
  },
  {
    name: 'Coupons',
    description: 'Operation related to Coupons',
  },
  {
    name: 'Customers',
    description: 'Operation related to Customers',
  },
  {
    name: 'OrderItems',
    description: 'Operation related to OrderItems',
  },
  {
    name: 'Orders',
    description: 'Operation related to Orders',
  },
  {
    name: 'PartnerStores',
    description: 'Operation related to PartnerStores',
  },
  {
    name: 'Payments',
    description: 'Operation related to Payments',
  },
  {
    name: 'Products',
    description: 'Operation related to Products',
  },
  {
    name: 'Referrals',
    description: 'Operation related to Referrals',
  },
  {
    name: 'Reviews',
    description: 'Operation related to Reviews',
  },
  {
    name: 'UniqueCoupons',
    description: 'Operation related to Unique Coupons',
  },
  {
    name: 'Wishlists',
    description: 'Operation related to Wishlists',
  },
]

export default ApiGroups
