export type DB = {
  host: string
  port?: number
  database: string
  user: string
  password: string
  timezone: string
}

export interface Database {
  query(sql: string, values?: any[]): Promise<any>
}

// Categories Model
export interface Category {
  categoryID: number
  categoryName: string
  description?: string
}

// Products Model
export interface Product {
  productID: number
  productName: string
  description?: string
  price: number
  stockQuantity: number
  categoryID: number
  images: string[] // Array of image URLs
}

// Customers Model
export interface Customer {
  customerID: number
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  shippingAddress?: string
  billingAddress?: string
}

// Orders Model
export interface Order {
  orderID: number
  customerID: number
  orderDate: Date
  totalAmount: number
  shippingAddress?: string
  orderStatus: 'Pending' | 'Shipped' | 'Delivered'
}

// Order Items Model
export interface OrderItem {
  orderItemID: number
  orderID: number
  productID: number
  quantity: number
  subtotal: number
}

// Payments Model
export interface Payment {
  paymentID: number
  orderID: number
  paymentDate: Date
  paymentAmount: number
  paymentMethod: string
}

// Cart Items Model
export interface CartItem {
  cartItemID: number
  customerID: number
  productID: number
  quantity: number
}

// Reviews Model
export interface Review {
  reviewID: number
  productID: number
  customerID: number
  rating: number
  reviewText?: string
  reviewDate: Date
}

// Wishlists Model
export interface Wishlist {
  wishlistID: number
  customerID: number
  productID: number
}

// Coupons Model
export interface Coupon {
  couponID: number
  couponCode: string
  discountAmount: number
  expiryDate: Date
  usageLimit: number
  usageCount: number
}

// Affiliates Model
export interface Affiliate {
  affiliateID: number
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  paymentInformation?: string
  affiliateCode: string
  balance: number
}

// Referrals Model
export interface Referral {
  referralID: number
  affiliateID: number
  referredCustomerID: number
  referralDate: Date
  referralStatus: 'Pending' | 'Completed'
}

// Unique Coupons Model
export interface UniqueCoupon {
  couponID: number
  couponCode: string
  discountAmount: number
  expiryDate: Date
  usageLimit: number
  usageCount: number
  associatedProductIDs?: string // Adjust as needed for actual product IDs
}

export interface ProductDetails extends Product {
  categoryName: string
}
