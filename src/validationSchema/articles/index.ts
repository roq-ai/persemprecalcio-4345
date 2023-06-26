import * as yup from 'yup';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  type: yup.string().required(),
  status: yup.string().required(),
  created_by: yup.string().nullable().required(),
  updated_by: yup.string().nullable(),
  approved_by: yup.string().nullable(),
});
