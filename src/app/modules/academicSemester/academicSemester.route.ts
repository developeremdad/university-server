import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
)

router.get(
  '/:AcademicSemesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
)

router.delete(
  '/:AcademicSemesterId',
  AcademicSemesterControllers.deleteAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
