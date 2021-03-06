import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import morgan from 'morgan'

import { router } from './routes'
import './database'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', router)

app.listen(3333, () => {
  console.log('🔥 Running on port ::3333')
})
