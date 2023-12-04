import { TDepartment } from './department.interface'
import { Department } from './department.model'

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload)
  return result
}

// Get all Departments
const getAllDepartmentsFromDB = async () => {
  const result = await Department.find({}).populate('faculty')
  return result
}

// Get single Department
const getSingleDepartmentFromDB = async (id: string) => {
  const result = await Department.findById(id).populate('faculty')
  return result
}

// Update department
const updateDepartmentIntoDB = async (
  id: string,
  payload: Partial<TDepartment>,
) => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentIntoDB,
}
