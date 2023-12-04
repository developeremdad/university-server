import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { DepartmentServices } from './department.service'

// Create academic department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  })
})

// Retrieve all departments
const getAllDepartments = catchAsync(async (_req: Request, res: Response) => {
  const result = await DepartmentServices.getAllDepartmentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments are retrieved successfully',
    data: result,
  })
})

// Retrieve a department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = req.params

  const result = await DepartmentServices.getSingleDepartmentFromDB(departmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result,
  })
})

// Update department
const updateDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params

  const result = await DepartmentServices.updateDepartmentIntoDB(departmentId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is updated successfully',
    data: result,
  })
})

export const DepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
}
