import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

const getAController = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Congratulation api running successfully.',
    path: '/api/v1/health',
  })
}
app.get('/health', getAController)

// Handle global error
app.use(globalErrorHandler)

// Handle not found route
app.use(notFound)

export default app
