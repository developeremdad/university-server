import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import AppError from '../../erros/App.Error'
import { Months, SemesterCode, SemesterName } from './semester.constant'
import { TSemester } from './semester.interface'

const semesterSchema = new Schema<TSemester>({
  name: {
    type: String,
    require: true,
    enum: SemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: SemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
})

// Check semester is exist or not
semesterSchema.pre('save', async function (next) {
  const semester = await Semester.findOne({
    year: this.year,
    name: this.name,
  })

  if (semester) {
    throw new AppError(httpStatus.ALREADY_REPORTED, 'Semester is already exist !')
  }
  next()
})

export const Semester = model<TSemester>('Semester', semesterSchema)
