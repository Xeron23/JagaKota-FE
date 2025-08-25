import * as Yup from 'yup';

const reportSchema = Yup.object().shape({
    title: Yup.string()
        .required('Judul wajib diisi.')
        .min(3, 'Judul minimal harus memiliki 3 karakter.')
        .max(100, 'Judul maksimal harus memiliki 100 karakter.'),
    
    description: Yup.string()
        .required('Deskripsi wajib diisi.')
        .min(10, 'Deskripsi minimal harus memiliki 10 karakter.'),

    latitude: Yup.number()
        .required('Latitude wajib diisi.')
        .min(-90, 'Nilai latitude minimal adalah -90.')
        .max(90, 'Nilai latitude maksimal adalah 90.')
        .typeError('Latitude harus berupa angka.'),

    longitude: Yup.number()
        .required('Longitude wajib diisi.')
        .min(-180, 'Nilai longitude minimal adalah -180.')
        .max(180, 'Nilai longitude maksimal adalah 180.')
        .typeError('Longitude harus berupa angka.'),

    street: Yup.string()
        .required('Alamat wajib diisi.')
        .min(10, 'Alamat minimal harus memiliki 10 karakter.'),

    provinceId: Yup.number()
        .required('Provinsi wajib dipilih.')
        .integer('ID Provinsi harus berupa bilangan bulat.')
        .positive('ID Provinsi harus berupa angka positif.')
        .typeError('ID Provinsi harus berupa angka.'),

    regencyId: Yup.number()
        .required('Kabupaten/Kota wajib dipilih.')
        .integer('ID Kabupaten/Kota harus berupa bilangan bulat.')
        .positive('ID Kabupaten/Kota harus berupa angka positif.')
        .typeError('ID Kabupaten/Kota harus berupa angka.'),


});

export default reportSchema;