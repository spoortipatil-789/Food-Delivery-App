import React, { useEffect, useState,useContext } from 'react'
import "./CartContainer.css"
import {MdAirlineSeatFlatAngled, MdOutlineKeyboardBackspace} from "react-icons/md"
import {RiRefreshFill} from "react-icons/ri"
import {BiMinus , BiPlus} from "react-icons/bi"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import EmptyCart from "./fdimg/emptyCart.svg"
import { Action } from 'history'



const CartContainer = (item ,{ cartMenu, setCartMenu }) => {
    
  const [{ cartShow , cartItems,user} , dispatch] = useStateValue();
  const [qty , setQty ]= useState(item.qty);
  const [items, setItems] = useState([]);
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const cartDispatch = () =>{
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems:items,
    })
  }

  const updateqty =(action, id)=>{
    if(action == "add"){
      setQty(qty + 1);
      cartItems.map(item => {
        if(item.id === id){
          item.qty += 1;
          setFlag(flag + 1)
        }
      });
      cartDispatch();
    }else{
      if(qty == 1){
        items = cartItems.filter((item => item.id !== id));
        setFlag(flag + 1);
        cartDispatch();
        
       
      }
      else{
        setQty(qty - 1);
        cartItems.map(item => {
          if(item.id === id){
            if(item.qty!=0){
            item.qty -= 1;
            setFlag(flag + 1 )
          }
        }
        });
        cartDispatch();
      }
    }
  }

useEffect(()=>{
  setItems(cartItems)
},[qty]);

useEffect(()=>{
  let totalPrice = cartItems.reduce(function (accumulator,item){
    return accumulator + item.qty * item.price;
  },0);
  setTot(totalPrice);
  console.log(tot);
 
},[tot, flag]);


const clearCart = ()=>{
  dispatch({
    type: actionType.SET_CARTITEMS,
    cartItems :[],
  });
  localStorage.setItem("cartItems", JSON.stringify([]));
}

  const showCart=()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow:!cartShow,
    })
  }

  return (
    <div className='cartcontainer'>

      <div className='cartcontainerforicon' onClick={showCart}>
        <MdOutlineKeyboardBackspace className='backspaceicon'   onClick={() => setCartMenu(false)}/>

        <p className='cart' >Cart</p>
        <p    onClick={clearCart} className='clear'>Clear  <RiRefreshFill/></p>
      </div>

      {
        cartItems && cartItems.length > 0 ? (
          <div className='bottomsectionforcartitem'>
         <div className='cartitemdetail'>
            {
              cartItems && cartItems.map(item =>(
                <div key={item.id} className='cartitem'>
                  <img src={item?.imageURL} alt='cartimg'/>

                  <div className='cartitemname'>
                     <p>{item?.title}</p>
                   
                     <p>${item.qty * item.price}</p>
                  </div>

                  <div className='cartitembutton'>
                  <div onClick={() => updateqty("remove" ,item?.id)} >
                  <BiMinus className='minusicon'/>
                  </div>
                   
                   <p>{item.qty}</p>
                   <div onClick={()=>updateqty("add" ,item?.id)} >
                   <BiPlus  className='minusicon'/>
                   </div>
                   
                  </div>


             </div>

              ))
            }
         </div>
         
          <div className='carttotal'>
              <div className='subtotalamount'>
                  <p> Sub Total</p>
                  
                  <p>
                    ${tot}
                  </p>
              </div>

              <div className='subtotalamount'>
                  <p> Delivery</p>
                  <p> $ 5</p>
              </div>
              <div className='devider'> </div>
              <div className='totalamount'>
                <p>Total</p>
                
                <p>${tot + 5}</p>
              </div>

             {user ? (
              <button type='button' className='button'>
                 Check Out
              </button>
             ):(
              <button type='button' className='button'>
                 Login out to check out
              </button>
             )
             }

          </div>

      </div>
        ) : (
          <div className='emptycart'> 
          <img src={EmptyCart} alt="emptycart"></img>
          <p>Add some items to your cart</p>
          </div>
        )
      }

    </div>
  )
}

export default CartContainer