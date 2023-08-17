import { DB } from '@app/interfaces/mysql'
import dotenv from 'dotenv'
import path from 'path'

const { parsed } = dotenv.config({
  path: path.resolve(__dirname, '../../../', '.env'),
})

const database: DB = {
  host: parsed!.HOST,
  user: parsed!.USER,
  password: parsed!.PASSWORD,
  database: parsed!.DATABASE,
  timezone: parsed!.TIMEZONE,
}

export default database
