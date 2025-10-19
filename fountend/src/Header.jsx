import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "./store/authslice";
import { FaRegCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";


const Header = () => {
  const navigate = useNavigate()
  const handleswan=()=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You really wants to logout",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes,Logout!"
}).then((result) => {
  if (result.isConfirmed) {
      localStorage.removeItem('token');
  localStorage.removeItem('user');
    dispatch(logout());
    Swal.fire({
      
      text: "Logout successfully",
      icon: "success",
      
    });
    navigate("/home")
  }
});
  }


   
  
   const dispatch = useDispatch()
   const {isLoggedIn,user}= useSelector((state)=>state.auth)
   const handleLogout = () => {
  
      handleswan()
  
};



  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

          {/* Logo */}
          <NavLink to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img className="rounded-3" src="/quiz.webp" alt="Quiz Logo" width="40" height="40" />
          </NavLink>

          {/* Navigation links */}
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink 
                to="/home" 
                className={({ isActive }) =>
                  "nav-link px-2 " + (isActive ? "text-secondary" : "text-light")
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/faq" 
                className={({ isActive }) =>
                  "nav-link px-2 " + (isActive ? "text-secondary" : "text-light")
                }
              >
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) =>
                  "nav-link px-2 " + (isActive ? "text-secondary" : "text-light")
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* Search bar */}
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          {/* Auth buttons */}
          <div className="text-end">
            
            {isLoggedIn?( <>
            <div className="d-flex gap-2 justify-content-center align-items-center">
             <FaRegCircleUser size={29} />

            <span className="text-capitalize">{user?.name}</span>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleLogout}
            >
              Logout
            </button>
            </div>
          </>):(<><NavLink to="/login">
            {({isActive})=>(
               <button type="button" className={`btn btn-outline-light ${isActive?"text-dark bg-white":""} me-2`}>Login</button>
            )}
            </NavLink>
            <NavLink to="/signup">
              {({isActive})=>(
               <button type="button" className={`btn btn-outline-light ${isActive?"text-dark bg-white":""} me-2`}>Signup</button>
            )}
            </NavLink></>)}
             
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
