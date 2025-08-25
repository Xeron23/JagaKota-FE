import * as yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;

const schemaRegister = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Username hanya boleh berisi huruf dan angka.')
    .min(3, 'Username minimal harus 3 karakter.')
    .max(30, 'Username maksimal harus 30 karakter.')
    .required('Username wajib diisi.'),

  firstname: yup
    .string()
    .max(50, 'Nama depan maksimal harus 50 karakter.')
    .required('Nama depan wajib diisi.'),

  lastname: yup
    .string()
    .max(50, 'Nama belakang maksimal harus 50 karakter.')
    .nullable(),

  email: yup
    .string()
    .email('Format email tidak valid.')
    .required('Email wajib diisi.'),

  password: yup
    .string()
    .min(8, 'Password minimal harus 8 karakter.')
    .matches(passwordRegex, 'Password harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka.')
    .required('Password wajib diisi.'),

  street: yup
    .string()
    .required('Alamat wajib diisi.'),

  'phone number': yup
    .string()
    .matches(phoneRegex, 'Format nomor telepon yang Anda masukkan tidak valid.')
    .nullable(),

  province: yup
    .number()
    .typeError('ID Provinsi harus berupa angka.')
    .integer('ID Provinsi harus berupa bilangan bulat.')
    .positive('ID Provinsi harus berupa angka positif.')
    .required('Provinsi wajib dipilih.'),

  regency: yup
    .number()
    .typeError('ID Kabupaten/Kota harus berupa angka.')
    .integer('ID Kabupaten/Kota harus berupa bilangan bulat.')
    .positive('ID Kabupaten/Kota harus berupa angka positif.')
    .required('Kabupaten/Kota wajib dipilih.'),
});

export default schemaRegister;
