import React, { useEffect, useRef, useState } from 'react';
import "./RowContainer.css";
import {MdShoppingBasket} from "react-icons/md";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const RowContainer = ({flag , data, scrollValue}) => {
  

  const rowContainer = useRef();
const [items, setItems] = useState([])

  const [{cartItems}, dispatch]= useStateValue();

  const addtocart=()=>{
    
   dispatch({
    type:actionType.SET_CARTITEMS,
    cartItems:items,
   });
   localStorage.setItem("cartItems",JSON.stringify(items))
  };

  useEffect(()=>{
    rowContainer.current.scrollLeft += scrollValue; 
  },[scrollValue]);


  useEffect(()=>{
    addtocart()
  },[items])

    return (
    <div ref={rowContainer} className={`rowcontainer ${flag ? "x-row": "y-row"}`}>
       {data && data.map(item =>(
        <div key={item.id} className='fruitsdetails'>
           <div className='imageofitem'>
               <div className='filteredimage'>
               <img src={item?.imageURL} alt=''></img>
               </div>
             

               <div className='carticons' onClick={()=>setItems([...cartItems , item])}>
                    <MdShoppingBasket />
               </div>
            </div>
            <div className='detailsofimage'>
              <p id='imagetitle'>{item?.title}</p>
              <p id='imagecalory'> {item?.calories} Calories</p>
              <p>${item?.price}</p>
            </div>
        </div>
       ))}
    </div>
  )
}

export default RowContainer