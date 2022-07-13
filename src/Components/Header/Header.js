import React from 'react'
import "./Header.css"
import logo from "../fdimg/logo.png"
import Avatar from "../fdimg/avatar.png"
import {MdShoppingBasket , MdAdd , MdLogout} from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../../firebase.config"
import {NavLink} from "react-router-dom"
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { useState } from 'react';
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();


  const [{user , cartShow , cartItems} , dispatch] = useStateValue();

  const [isMenu, setisMenu] = useState(false)

  const login = async()=>{
    if(!user){
      const {user : {refreshToken , providerData}} = await signInWithPopup(firebaseAuth,provider)
      dispatch ({
        type :actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    else{
      setisMenu(!isMenu)
    }
  };


  const logout =()=>{
    setisMenu(false)
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user:null,
    });
  }
  
  const showCart=()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow:!cartShow,
    })
  }

  return (
    <header className='header'>
       <div className='content'>
           <NavLink  to={"/"} className='logo'>
             <img src={logo} alt="logo"/>
             <p>City</p>
           </NavLink>
          <div className='navbarcontent'>
          <ul className='navbar'>
               <li>Home</li>
               <li>Menu</li>
               <li>AboutUs</li>
               <li>Service</li>
             </ul>
             <div className='carticon' onClick={showCart}>
               <MdShoppingBasket className='iconimg'/>
               {cartItems && cartItems.length > 0 && (
                <div className='cartcontent'>
                    <p>{cartItems.length}</p>
                </div>
               )}
             </div>
             <div className='userprofilecontent'>
             <img src={user ? user.photoURL : Avatar} alt="userprofile" className='userprofile' onClick={login}/>
              
              {
                isMenu && (
                  <div className='menu'>
               {
                user && user.email === "patilspoorti993@gmail.com" && (
                 <NavLink to={"/createitem"}>
                 <p onClick={()=>setisMenu(false)}>new item <MdAdd /></p>
                 </NavLink> 
                )
               }
               <p onClick={logout}>logout <MdLogout/></p>
             </div>
                )
              }
             </div>
             
          </div>
       </div>
    </header>
  )
}

export default Header