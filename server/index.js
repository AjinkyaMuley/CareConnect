import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import workerRoutes from './routes/workersRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import jobPostRoutes from './routes/jobPostRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.use('/api/workers/',workerRoutes)
app.use('/api/login/',loginRoutes)
app.use('/api/jobs/',jobPostRoutes)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

// const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient();

// async function main(){
//     const newUser = await prisma.user.create({
//         data: {
//             email : "abc@gmail.com",
//             phone_number : 123456789
//         }
//     })

//     console.log("New User created: ",newUser)
// }

// main()
// .catch(e => {
//     throw e;
// })
// .finally(async () => {
//     await prisma.$disconnect()
// })