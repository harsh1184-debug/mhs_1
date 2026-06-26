import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import routes from './routes/index'
import { config } from './config/env'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({ origin: config.corsOrigin, credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/api', routes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})