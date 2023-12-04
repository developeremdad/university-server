import User from '../user/user.model'
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

const deleteStudentFromDB = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
