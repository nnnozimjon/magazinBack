import mysql from 'mysql2'
import config from '../../config'

const dbConnection = mysql.createPool(config.database)

export default dbConnection
