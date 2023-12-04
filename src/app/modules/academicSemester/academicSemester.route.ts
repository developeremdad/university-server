import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
)

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
)

router.patch('/:semesterId', AcademicSemesterControllers.updateAcademicSemester)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
