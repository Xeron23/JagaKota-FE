import * as yup from 'yup';

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required('Harap isi Username atau Email'), // Yup akan tangkap `.required()` sebagai validator kosong juga

  password: yup
    .string()
    .required('Harap isi Password'),
});

export default schema;
