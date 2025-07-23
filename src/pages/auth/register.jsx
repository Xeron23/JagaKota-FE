import { useState } from 'react';
import { useAuth } from '../../context/Auth.jsx';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input.jsx';
import schemaRegister from '../../schema/register.js';
import ButtonSubmit from '../../components/button.jsx';

function Register() {
  const [formData, setFormData] = useState({username: '', name: '', password: ''});
  const [errorMessage, setErrorMessage] = useState({});
    const {register} = useAuth();
    const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    
    try {
      await schemaRegister.validate(formData, {abortEarly: false})
      setErrorMessage({});

      const userRegis = await register({username: formData.username, name: formData.name, password: formData.password})
      
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
      setFormData({...formData, [e.target.name]: e.target.value})
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form onSubmit={handleRegister}>

          <Input
                label="Username"
                name= "username"
                value={formData.username}
                id="username"
                onChange={handleChange}
                placeholder= "budi123"
                error={errorMessage.username}
          />

          <Input 
                label="Name"
                name= "name"
                value={formData.name}
                id="name"
                onChange={handleChange}
                placeholder= "budi subianto"
                error={errorMessage.name}
            />

          <Input 
                label="Password"
                name= "password"
                type="password"
                value={formData.password}
                id="password"
                onChange={handleChange}
                placeholder= "********"
                error={errorMessage.password}
            />
            <ButtonSubmit 
              onClick={null}
              style="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                Login
            </ButtonSubmit>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
