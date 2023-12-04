import httpStatus from 'http-status'
import AppError from '../../erros/App.Error'
import { semesterNameCodeMapper } from './semester.constant'
import { TSemester } from './semester.interface'
import { Semester } from './semester.model'

const createSemesterIntoDB = async (payload: TSemester) => {
  // Check semester and code code matched
  if (semesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid semester code')
  }

  const result = await Semester.create(payload)
  return result
}

// Get all academic semester
const getAllSemestersFromDB = async () => {
  const result = await Semester.find({})
  return result
}

// Get single academic semester
const getSingleSemesterFromDB = async (id: string) => {
  const result = await Semester.findById(id)
  return result
}

// Update academic semester
const updateSemesterIntoDB = async (
  id: string,
  payload: Partial<TSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid semester code')
  }

  const result = await Semester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

// // Delete academic semester
// const deleteSemesterFromDB = async (id: string) => {
//   const result = await Semester.updateOne(
//     { _id: id },
//     { isDeleted: true },
//   )
//   return result
// }

export const SemesterServices = {
  createSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
  updateSemesterIntoDB,
}
