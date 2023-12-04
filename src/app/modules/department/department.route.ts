import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DepartmentControllers } from './department.controller'
import { DepartmentValidation } from './department.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.createDepartmentValidation),
  DepartmentControllers.createDepartment,
)

router.get('/:departmentId', DepartmentControllers.getSingleDepartment)

router.patch(
  '/:departmentId',
  validateRequest(DepartmentValidation.updateDepartmentValidation),
  DepartmentControllers.updateDepartment,
)

router.get('/', DepartmentControllers.getAllDepartments)

export const DepartmentRoutes = router
