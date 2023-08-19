import { dbModel } from '../../interfaces'

class OnlineStoreDatabase {
  constructor(private db: dbModel.Database) {}

  async getProductsByCategory(categoryID: number): Promise<dbModel.Product[]> {
    const sql = `SELECT * FROM Products WHERE CategoryID = ?`
    const [rows] = await this.db.query(sql, [categoryID])
    return rows as dbModel.Product[]
  }

  async getProductDetails(
    productID: number
  ): Promise<dbModel.ProductDetails | null> {
    const sql = `
            SELECT p.*, c.CategoryName
            FROM Products p
            INNER JOIN Categories c ON p.CategoryID = c.CategoryID
            WHERE p.ProductID = ?
        `
    const [rows] = await this.db.query(sql, [productID])

    if (rows.length === 0) {
      return null
    }

    const productDetails: dbModel.ProductDetails = {
      ...rows[0],
      categoryName: rows[0].CategoryName,
      images: JSON.parse(rows[0].Images),
    }
    return productDetails
  }

  async getCustomerOrders(customerID: number): Promise<dbModel.Order[]> {
    const sql = `
            SELECT o.*, SUM(oi.Subtotal) AS TotalAmount
            FROM Orders o
            INNER JOIN OrderItems oi ON o.OrderID = oi.OrderID
            WHERE o.CustomerID = ?
            GROUP BY o.OrderID
        `
    const [rows] = await this.db.query(sql, [customerID])
    return rows as dbModel.Order[]
  }

  // Add more functions as needed for various queries

  // Helper function to parse JSON columns
  parseJsonColumn(jsonString: string): any {
    try {
      return JSON.parse(jsonString)
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return null
    }
  }
}

// // Create a database connection
// const dbConfig = {
//   host: 'localhost',
//   user: 'your_username',
//   password: 'your_password',
//   database: 'your_database',
// }

// const connection = mysql.createPool(dbConfig)

// // Initialize the OnlineStoreDatabase instance
// const onlineStoreDb = new OnlineStoreDatabase(connection)
