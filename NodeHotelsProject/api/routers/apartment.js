import express from 'express'
import multer from 'multer'//בשביל התמונות
import { advertiserExists, categoryExists, checkToken, cityExists } from '../middleware.js'
import { create, getAll, getByAdvertiser, getByBeds, getByCatgeory, getByCity, getById, getByPrice, remove, update } from '../controllers/apartment.js'

//תמונות לענן
const storage = multer.memoryStorage(); // או multer.diskStorage() אם אתה רוצה לשמור על דיסק
const upload = multer({ storage: storage });
const router = express.Router()


router.get('', getAll)
router.get('/getbyid/:id', checkToken, getById)
router.get('/getbycategory/:id', getByCatgeory)
router.get('/getbycity/:id', getByCity)
router.get('/getbybeds/:small/:big', getByBeds)
router.get('/getbyprice/:small/:big', getByPrice)
router.get('/getbyadvertiser/:id', checkToken,getByAdvertiser)
router.post('',upload.single('pic'), checkToken, cityExists,categoryExists,advertiserExists, create)
router.delete('/:id/:advertiserID', checkToken, remove)
router.patch('/:id/:advertiserID', checkToken, cityExists,categoryExists,advertiserExists, update)

export default router;