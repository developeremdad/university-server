import { z } from 'zod'

const createDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department must be string',
    }),
    faculty: z.string(),
  }),
})

const updateDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department must be string',
      })
      .optional(),
    faculty: z.string().optional(),
  }),
})

export const DepartmentValidation = {
  createDepartmentValidation,
  updateDepartmentValidation,
}
