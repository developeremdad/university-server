import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculty.service'

// Create academic faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyServices.createFacultyIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })
})

// Retrieve all Faculties
const getAllFaculties = catchAsync(async (_req: Request, res: Response) => {
  const result = await FacultyServices.getAllFacultiesFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties are retrieved successfully',
    data: result,
  })
})

// Retrieve a single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params

  const result = await FacultyServices.getSingleFacultyFromDB(facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved successfully',
    data: result,
  })
})

// Update academic faculty
const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params

  const result = await FacultyServices.updateFacultyIntoDB(facultyId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  })
})

export const FacultyControllers = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
}
