import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import GoogleAuthHandler from "./Components/GoogleAuthHandler";
import Livestock from "./Pages/Livestock";
import Tanks from "./Pages/Tanks";
import Medication from "./Pages/Medication";
import OtherItems from "./Pages/OtherItems";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProfile from "./Pages/Admin/AdminProfile";
import AdminLivestock from "./Pages/Admin/AdminLivestock";
import AdminTanks from "./Pages/Admin/AdminTanks";
import AdminMedication from "./Pages/Admin/AdminMedication";
import AdminOtherItems from "./Pages/Admin/AdminOtherItems";
import AdminOrders from "./Pages/Admin/AdminOrders";

function App() {
  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/livestock" element={<Livestock/>}/>
                  <Route path="/tanks" element={<Tanks/>}/>
                  <Route path="/medication" element={<Medication/>}/>
                  <Route path="/other" element={<OtherItems/>}/>
                  <Route path="/cart" element={<Cart/>}/>

                  <Route path="/admin" element={<AdminDashboard/>}/>
                  <Route path="/ad-profile" element={<AdminProfile/>}/>
                  <Route path="/ad-livestock" element={<AdminLivestock/>}/>
                  <Route path="/ad-tanks" element={<AdminTanks/>}/>
                  <Route path="/ad-medication" element={<AdminMedication/>}/>
                  <Route path="/ad-other" element={<AdminOtherItems/>}/>
                    <Route path="/ad-orders" element={<AdminOrders/>}/>

                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/google" element={<GoogleAuthHandler/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
