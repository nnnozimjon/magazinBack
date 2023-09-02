import { v4 } from 'uuid'
import path from 'path'
import multer from 'multer'

class FileDownload {
  static AuthFiles = () => {
    const destinationDirectory = path.join(
      __dirname,
      '../../assets/partnerStoresImages'
    )

    const storage = multer.diskStorage({
      destination: destinationDirectory,
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname)
        const customFilename = v4() + fileExtension
        cb(null, customFilename)
      },
    })

    const upload = multer({ storage })
    return upload
  }
}

export default FileDownload
