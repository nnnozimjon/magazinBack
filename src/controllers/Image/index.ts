// absolute imports
import { Request, Response } from 'express'
import fs from 'fs'

class ImageController {
  static async storeProductImage(req: Request, res: Response) {
    const image = req.params.image

    fs.readFile(`src/assets/storeProductsImages/${image}`, (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`)
        return res.status(500).json({
          code: 500,
          message: 'Error reading file',
        })
      }
      const contentType = ImageController.getContentType(image)
      res.setHeader('Content-Type', contentType)
      res.send(data)
    })
  }

  static async partnerStoreImage(req: Request, res: Response) {
    const image = req.params.image

    fs.readFile(`src/assets/partnerStoresImages/${image}`, (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`)
        return res.status(500).json({
          code: 500,
          message: 'Error reading file',
        })
      }
      const contentType = ImageController.getContentType(image)
      res.setHeader('Content-Type', contentType)
      res.send(data)
    })
  }

  private static getContentType(image: string): string {
    const extension = image.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'png':
        return 'image/png'
      case 'gif':
        return 'image/gif'
      default:
        return 'application/octet-stream'
    }
  }
}

export default ImageController
