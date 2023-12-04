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
  async (req: Request, res: Response) => {
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
    const { AcademicSemesterId } = req.params

    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        AcademicSemesterId,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved successfully',
      data: result,
    })
  },
)

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { AcademicSemesterId } = req.params

    const result =
      await AcademicSemesterServices.deleteAcademicSemesterFromDB(
        AcademicSemesterId,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is deleted successfully',
      data: result,
    })
  },
)

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  deleteAcademicSemester,
}
