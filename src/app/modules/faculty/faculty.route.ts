import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { FacultyControllers } from './faculty.controller'
import { FacultyValidation } from './faculty.validation'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidation),
  FacultyControllers.createFaculty,
)

router.get('/:facultyId', FacultyControllers.getSingleFaculty)

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidation.updateFacultyValidation),
  FacultyControllers.updateFaculty,
)

router.get('/', FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
