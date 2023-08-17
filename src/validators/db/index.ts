import { dbConnection } from '../../common'

const database = dbConnection.getConnection((err: any) => {
  if (err) {
    console.log('Error getting connection to database: ' + err)
  } else {
    console.log('Successful database connection!')
  }
})

export default database
