import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

// Create academic semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { academicSemester: academicSemesterData } = req.body
    const result =
      await AcademicSemesterServices.createAcademicSemesterIntoDB(
        academicSemesterData,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    })
  },
)

// Retrieve all AcademicSemesters
const getAllAcademicSemesters = catchAsync(
  async (_req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemestersFromDB()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    })
  },
)

// Retrieve a single AcademicSemester
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params

    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved successfully',
      data: result,
    })
  },
)

// Update academic semester
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
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
// const deleteAcademicSemester = catchAsync(
//   async (req: Request, res: Response) => {
//     const { semesterId } = req.params

//     const result =
//       await AcademicSemesterServices.deleteAcademicSemesterFromDB(semesterId)

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic semester is deleted successfully',
//       data: result,
//     })
//   },
// )

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
