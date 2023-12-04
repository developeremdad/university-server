import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import AppError from '../../erros/App.Error'
import { TDepartment } from './department.interface'

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Faculty id is required'],
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
)

departmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await Department.findOne({ name: this.name })

  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'This department is already exist!',
    )
  }
  next()
})

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await Department.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist!')
  }
  next()
})

export const Department = model<TDepartment>('Department', departmentSchema)
