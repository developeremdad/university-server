import { z } from 'zod'

const createFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty must be string',
    }),
  }),
})

const updateFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty must be string',
    }),
  }),
})

export const FacultyValidation = {
  createFacultyValidation,
  updateFacultyValidation,
}
