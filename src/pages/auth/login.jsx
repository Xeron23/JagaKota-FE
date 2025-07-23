import { useState} from "react";
import ButtonSubmit from "../../components/button";
import { useAuth } from "../../context/Auth.jsx";
import { useNavigate } from "react-router-dom";
import schema from "../../schema/login.js";
import Input from "../../components/input.jsx";
import Alert from "../../components/alert.jsx";

function Login() {
    const {login} = useAuth(); 
    const [formData, setFormData] = useState({ username: '', password: '' });
    
    // error message 
    const [errorMessage, setErrorMessage] = useState({});
    const navigate = useNavigate(); 


      const handleSubmit = async (e)=>{
        e.preventDefault();
        
        try {
            await schema.validate(formData, { abortEarly: false }); 
            setErrorMessage({});

            const auth = await login(formData.username , formData.password)
            if(auth.success) {
              navigate('/dashboard')
            }
            if(auth.error)
            {
                setErrorMessage({err: auth.error});
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
    }

      const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
      }

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>

            {errorMessage.err && 
            <Alert 
              message={errorMessage.err}
              type="danger"
            />}
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
            <p className="mt-4 text-sm text-center text-gray-600">
                Belum punya akun?{" "}
                <a href="/" className="text-blue-500 hover:underline">
                    Daftar
                </a>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
