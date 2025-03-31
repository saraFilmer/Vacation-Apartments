import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import advertiserRouter from './api/routers/advertiser.js'
import cityRouter from './api/routers/city.js'
import categoryRouter from './api/routers/category.js'
import apartmentRouter from './api/routers/apartment.js'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'


const app = express()
const port = 3001
app.use(bodyParser.json())
app.use(cors())
//תמונות לענן
const storage = multer.memoryStorage(); // או multer.diskStorage() אם אתה רוצה לשמור על דיסק
const upload = multer({ storage: storage });


app.listen(port, ()=>{
    //אם הפרויקט ב node רץ נכון מדפיס כאן
    console.log(`The running is sucses http://localhost:${port}`);
})
mongoose.connect(`mongodb://localhost:27017/Hotel`)
    .then(() => {
            //אם הפרויקט ב node רץ נכון מדפיס כאן
        console.log('connect to mongoDB! 🥰🤪🤣👏👍');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

dotenv.config();

app.use('/hello', (req, res, next) => {
    console.log('hello!!!!!!!!!!!!!!!!!!!!!!');
    next()
})

app.use('/advertiser', advertiserRouter)
app.use('/city', cityRouter)
app.use('/category', categoryRouter)
app.use('/apartment', apartmentRouter)





