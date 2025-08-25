import { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth.jsx';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input.jsx';
import schemaRegister from '../../schema/register.js';
import ButtonSubmit from '../../components/button.jsx';
import { getAllProvince, getRegencyById } from '../../resolver/auth/province.js';
import Alert from '../../components/alert.jsx';

function Register() {
  const [formData, setFormData] = useState({username: '', firstname: '', lastname: '', email: '', street: '', 'phone number': '', province: '', regency: '',password: '', latitude: '', longitude:''});
  const [errorMessage, setErrorMessage] = useState({});

  // province and regency
  const [province, setProvince] = useState([]);
  const [regency, setRegency] = useState([]);

  const {register} = useAuth();
  const navigate = useNavigate();

  // get location
  useEffect(()=>{
      getProvince()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          getPosition,
          (error) => {
            console.error("Error mendapatkan lokasi:", error.message);
          }
        );
      } else {
        console.error("Geolocation tidak didukung di browser ini.");
      }
  }, []);


  const getProvince = async()=>{
      const province = await getAllProvince();
      setProvince(province);
  }

  const getRegency = async(id)=>{
    const regency = await getRegencyById(id);
    console.log(regency);
    
    setRegency(regency);
  }

  const getPosition = (position)=>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // reverseGeocode(latitude, longitude)
    setFormData({...formData, ['latitude']: latitude})
    setFormData({...formData, ['longitude']: longitude})
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      await schemaRegister.validate(formData, {abortEarly: false})
      setErrorMessage({});
      
      const userRegis = await register(formData)
      
      if(userRegis.success)
      {
          navigate('/login')
      }
      if(userRegis.error){
        setErrorMessage({err: userRegis.error})
      }
    } catch (err) {
          if (err.inner) {
                const errorObj = {};
                err.inner.forEach((e) => {
                    errorObj[e.path] = e.message;
                });
                setErrorMessage(errorObj);
            } 
    }
  };

    const handleChange = (e)=>{
        const { name, value } = e.target;

        // Paksa menjadi integer jika inputnya province atau regency
        const parsedValue = (name === 'province' || name === 'regency') ? parseInt(value) : value;
      setFormData({...formData, [name]: parsedValue})
    }


  // return (


  //   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

  //       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
  //       <form onSubmit={handleRegister}>

  //         {/* username */}
  //         <Input
  //               label="Username"
  //               name= "username"
  //               value={formData.username}
  //               id="username"
  //               onChange={handleChange}
  //               placeholder= "budi123"
  //               error={errorMessage.username}
  //         />

  //         {/* firstname */}
  //         <Input
  //               label="Firstname"
  //               name= "firstname"
  //               value={formData.firstname}
  //               id="firstname"
  //               onChange={handleChange}
  //               // placeholder= ""
  //               error={errorMessage.username}
  //         />


  //       {/* lastname */}
  //         <Input
  //               label="Lastname"
  //               name= "lastname"
  //               value={formData.lastname}
  //               id="lastname"
  //               onChange={handleChange}
  //               // placeholder= ""
  //               error={errorMessage.username}
  //         />

  //       {/* Email */}
  //         <Input
  //               label="Email"
  //               name= "email"
  //               value={formData.email}
  //               id="email"
  //               onChange={handleChange}
  //               // placeholder= ""
  //               error={errorMessage.username}
  //         />


  //       {/* street */}
  //         <Input
  //               label="Street"
  //               name= "street"
  //               value={formData.street}
  //               id="street"
  //               onChange={handleChange}
  //               // placeholder= ""
  //               error={errorMessage.username}
  //         />


  //       {/* phoneNumber */}
  //         <Input
  //               label="Phone Number"
  //               name= "phone number"
  //               value={formData['phone number']}
  //               id="phone number"
  //               onChange={handleChange}
  //               // placeholder= ""
  //               error={errorMessage.username}
  //         />

  //       {/* province id */}

  //         <label for="province">Pilih provinsi</label>
  //         <select 
  //         name='province' 
  //         value={formData.province} 
  //         onChange={
  //           (e)=>{
  //             handleChange(e)
  //             getRegency(e.target.value)
  //           }
  //         } 
  //         id='province'>
  //             {
  //               province.map((prov)=>(
  //                 <option key={prov.province_id} value={prov.province_id}>{prov.name}</option>
  //               ))
  //             }
  //         </select>


  //       {/* regency id */}
  //       <label for="regency">Pilih Regency</label>
  //       <select
  //         name='regency'
  //         value={formData.regency}
  //         onChange={handleChange}
  //         id='regency'>
  //         {
  //           regency.map((reg)=>(
  //             <option key={reg.regency_id} value={reg.regency_id}>{reg.name}</option>
  //           ))
  //         }
  //       </select>

  //         {/* password */}
  //         <Input 
  //               label="Password"
  //               name= "password"
  //               type="password"
  //               value={formData.password}
  //               id="password"
  //               onChange={handleChange}
  //               placeholder= "********"
  //               error={errorMessage.password}
  //           />
  //           <ButtonSubmit 
  //             onClick={null}
  //             style="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
  //               Register
  //           </ButtonSubmit>
  //       </form>

  //       <p className="mt-4 text-sm text-center text-gray-600">
  //         Sudah punya akun?{' '}
  //         <a href="/login" className="text-blue-500 hover:underline">
  //           Login
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
        <div className="min-h-screen flex items-center justify-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/images/asset_login_1.png'), url('/images/asset_login_2.png')",
        backgroundPosition: "left 100%, right center",
        backgroundSize: "1172px 498px, contain"
    }}>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Daftar Baru</h2>
            <p className="text-sm text-[#525252] mb-2">Buat akun baru.</p>
            <hr className="border-[#F7EEDF] my-3 border-[1.5px]" />
        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">


          <div className="md:col-span-2">
            {errorMessage.err &&
                <Alert
                  message={errorMessage.err}
                  type="danger"
                />
            }
            {/* username - full width */}
            <Input
              label="Username"
              name="username"
              id='username'
              value={formData.username}
              onChange={handleChange}
              placeholder="budi123"
              error={errorMessage.username}
            />
          </div>

          {/* firstname & lastname */}
          <Input label="Firstname" name="firstname" value={formData.firstname} onChange={handleChange} error={errorMessage.firstname} id='firstname'/>
          <Input label="Lastname" name="lastname" value={formData.lastname} onChange={handleChange} error={errorMessage.lastname} id='lastname'/>

          {/* email & street */}
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errorMessage.email} id='email'/>
          <Input label="Street" name="street" value={formData.street} onChange={handleChange} error={errorMessage.street} id='street'/>

          {/* phone number & password */}
          <Input label="Phone Number" name="phone number" value={formData['phone number']} onChange={handleChange} error={errorMessage['phone number']} id='phonenumber'/>
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errorMessage.password} id='password'/>

          {/* province & regency */}
          <div className="flex flex-col">
            <label htmlFor="province" className="text-gray-700 font-bold mb-1 ">Provinsi</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={(e) => {
                handleChange(e);
                getRegency(e.target.value);
              }}
              className="border border-[#F7EEDF] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F7EEDF]  bg-[#F7EEDF]"
            >
              <option value="">-- Pilih Provinsi --</option>
              {province.map((prov) => (
                <option key={prov.province_id} value={prov.province_id}>{prov.name}</option>
              ))}
            </select>
            {errorMessage.province && <p className="text-red-500 text-sm mt-1">{errorMessage.province}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="regency" className="text-gray-700 font-medium mb-1">Kota/Kabupaten</label>
            <select
              id="regency"
              name="regency"
              value={formData.regency}
              onChange={handleChange}
              className="border border-[#F7EEDF] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F7EEDF]  bg-[#F7EEDF]"
            >
              <option value="">-- Pilih Kota/Kabupaten --</option>
              {regency.map((reg) => (
                <option key={reg.regency_id} value={reg.regency_id}>{reg.name}</option>
              ))}
            </select>
            {errorMessage.regency && <p className="text-red-500 text-sm mt-1">{errorMessage.regency}</p>}
          </div>

          {/* Submit button - full width */}
          <div className="md:col-span-2">
            <ButtonSubmit
              onClick={null}
              style="w-full  bg-[#6B8F71] text-white py-2 px-4 rounded-md hover:bg-[#6B8F71] rounded-md hover:bg-white transition-colors duration-200 hover:text-[#6B8F71] hover:border-[#6B8F71] hover:border mt-4"
            >
              Register
            </ButtonSubmit>
          </div>
        </form>


        <p className="mt-6 text-sm text-center text-gray-600 font-bold">
          Sudah punya akun?{' '}
          <a href="/login" className="text-blue-500 hover:underline text-[#6B8F71]">Login</a>
        </p>
      </div>
    </div>
  );

}

export default Register;



  // function reverseGeocode(lat, lon) {
  //   fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("Alamat lengkap:", data.display_name);
  //       console.log("Kota:", data.address.city || data.address.town || data.address.village);
  //       console.log("Provinsi:", data.address.state);
  //       console.log("Negara:", data.address.country);
  //       console.log("Jalan:", data.address.road);
  //     })
  //     .catch(err => console.error("Gagal reverse geocoding:", err));
  // }
