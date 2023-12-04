import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from '../student/student.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

// const zodParsedData = studentValidationSchema.parse(studentData);

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

export const UserRoutes = router
