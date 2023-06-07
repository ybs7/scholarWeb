import express from 'express'
import cors from 'cors'

import postgresClient from './config/db.js'

import userRouter from './routers/userRouter.js'

import serpApiRouter from './routers/serpApiRouter.js'
const app = express()

// app.use((req, res, next) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Headers", "*");
//     res.set("Access-Control-Allow-Methods", "*");
//     res.set("x-requested-with", "XMLHttpRequest");
//     res.set("Access-Control-Expose-Headers","Content-Encoding,api_key");
//     res.set("origin","http://localhost:3000");
//     if (req.method === "OPTIONS") {
//         res.status(200).end();
//         return;
//     }
//     next();
// });
app.use(cors())
app.use(express.json())

app.use('/', userRouter)
app.use('/', serpApiRouter)


const PORT = process.env.PORT || 9999

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    postgresClient.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        }else {
            console.log('db connection successful')
        }
    })
})

