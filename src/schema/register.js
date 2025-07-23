import * as yup from 'yup';

const schemaRegister = yup.object().shape({
    username: yup.string().min(3, 'Minimal 3 karakter').required('Username wajib diisi'),
    name: yup.string().min(5, 'Minimal 5 karakter').required('name wajib di isi'),
    password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});

export default schemaRegister;