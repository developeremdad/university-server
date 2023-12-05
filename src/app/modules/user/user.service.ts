import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../erros/App.Error'
import { Semester } from '../semester/semester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import User from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // If password is not given , use default password
  userData.password = password || (config.default_password as string)

  // Set student role
  userData.role = 'student'

  // Find academic semester info
  const semester = await Semester.findById(payload.semester)

  // Check semester is found
  if (!semester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // Set manually generated it
    userData.id = await generateStudentId(semester)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // Return as array

    // Create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // Set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create new student',
    )
  }
}

export const UserServices = {
  createStudentIntoDB,
}
