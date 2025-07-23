import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().min(3, 'Minimal 3 karakter').required('Username wajib diisi'),
    password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});

export default schema;