import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../erros/App.Error'
import User from '../user/user.model'
import { TStudent } from './student.interface'
import { Student } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find({})
    .populate('user')
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    })
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    })
  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student now fount')
  }

  const modifyUpdateData: Record<string, unknown> = { ...remainingStudentData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyUpdateData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyUpdateData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyUpdateData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifyUpdateData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // Delete user (transaction-1)
    const deleteUser = await User.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    const deleteStudent = await Student.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    await session.commitTransaction()
    await session.endSession()

    return deleteStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete student',
    )
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
