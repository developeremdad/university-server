import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Check semester and code code matched
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

// Get all academic semester
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find({})
  return result
}

// Get single academic semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

// Update academic semester
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  
  return result
}

// // Delete academic semester
// const deleteAcademicSemesterFromDB = async (id: string) => {
//   const result = await AcademicSemester.updateOne(
//     { _id: id },
//     { isDeleted: true },
//   )
//   return result
// }

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
