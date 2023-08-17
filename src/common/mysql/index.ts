import mysql from 'mysql'
import config from '../../config'

const dbConnection = mysql.createPool(config.database)

export default dbConnection
