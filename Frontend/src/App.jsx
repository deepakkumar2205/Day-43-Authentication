import { useEffect, useState } from 'react';
import './App.css';
import { Routes , Route , Link ,useNavigate, useLocation} from 'react-router-dom' ;
import { About } from './components/About';
import { Home } from './components/Home';
import { Phone } from './components/Phone';
import { ProtectedRoute } from './components/ProtectedRoute';
import API from './url';
import Signup from './components/signup/Signup.jsx';
import Login from './components/LoginFolder/LoginFile.jsx';
import { Emailverify } from './components/mailverification/Emailverify';
import Header from './components/Header';
import { ResetPassword } from './components/resetPassword/ResetPassword';
import { ResetPassPage } from './components/ResetPassPage/ResetPassPage';

function App() {
  const [mobile , setMobile] = useState([]);
  const navigate=useNavigate();
  const location =useLocation();

  //!to get all mobiles funciton
 function getAllMobiles() {
    fetch(`${API}/mobiles`, {
      method: "GET",
      headers: {
        'x-Auth-token': localStorage.getItem("x-Auth-token"),
        'roleId':localStorage.getItem("roleId")
      }
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((mbs) => setMobile(mbs))
      .catch((err) => {
        console.log(location.pathname.slice(0,12));
        if(location.pathname.slice(0,12) == "/emailverify"){
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }else if(location.pathname.slice(0,12) ==='/resetPassPa'){
            
        }else{
          navigate("/login")
        }
        localStorage.removeItem("x-Auth-token");
      });
  }
  

  useEffect(() => {
    getAllMobiles();
  }, []);

  const handleLogout = () =>{
    localStorage.clear();
    navigate("/login");
  }
  console.log(location.pathname !== "/emailverify/:id");
  return (
    <div className="App">
      {location.pathname.slice(0,12) !== "/emailverify"?<Header handleLogoutFn={handleLogout}/>:<></>}
      <Routes>
        <Route path="/" element={<Home getAllMobilesFn={()=>getAllMobiles()}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login getAllMobilesFn={()=>getAllMobiles()}/>} />
        <Route path="/emailverify/:id" element={<Emailverify />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/resetPassPage/:string" element={<ResetPassPage />} />
        <Route
          path="/mobile"
          element={
            <ProtectedRoute>
              <Phone data={mobile} getAllMobilesFn={()=>getAllMobiles()}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
export { App } 




