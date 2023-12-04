import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterServices } from './semester.service'

// Create academic semester
const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterServices.createSemesterIntoDB(req.body)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    })
  },
)

// Retrieve all Semesters
const getAllSemesters = catchAsync(
  async (_req: Request, res: Response) => {
    const result =
      await SemesterServices.getAllSemestersFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    })
  },
)

// Retrieve a single Semester
const getSingleSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params

    const result =
      await SemesterServices.getSingleSemesterFromDB(semesterId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved successfully',
      data: result,
    })
  },
)

// Update academic semester
const updateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await SemesterServices.updateSemesterIntoDB(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully',
    data: result,
  })
})

// // Delete academic semester
// const deleteSemester = catchAsync(
//   async (req: Request, res: Response) => {
//     const { semesterId } = req.params

//     const result =
//       await SemesterServices.deleteSemesterFromDB(semesterId)

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic semester is deleted successfully',
//       data: result,
//     })
//   },
// )

export const SemesterControllers = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
}
