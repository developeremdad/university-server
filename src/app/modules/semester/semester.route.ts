import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterControllers } from './semester.controller'
import { semesterValidations } from './semester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(semesterValidations.createSemesterValidationSchema),
  SemesterControllers.createSemester,
)

router.get('/:semesterId', SemesterControllers.getSingleSemester)

router.patch(
  '/:semesterId',
  validateRequest(semesterValidations.updateSemesterValidationSchema),
  SemesterControllers.updateSemester,
)

router.get('/', SemesterControllers.getAllSemesters)

export const SemesterRoutes = router
