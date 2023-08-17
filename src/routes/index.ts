import express from 'express'
import System from '../controllers'
import Api from '../constants'

const Router = express.Router()

Router.get(Api.auth.login, System.UserAuth.login)

export default Router
