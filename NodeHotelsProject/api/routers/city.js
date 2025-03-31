import express from 'express'
import { create, getAll } from '../controllers/city.js'
import { checkToken } from '../middleware.js'

const router = express.Router()

router.get('', getAll)
router.post('',checkToken, create)


export default router;