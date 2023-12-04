import { Schema, model } from 'mongoose'
import { TFaculty } from './faculty.interface'

const facultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Faculty name is required'],
    },
  },
  {
    timestamps: true,
  },
)

export const Faculty = model<TFaculty>('Faculty', facultySchema)
