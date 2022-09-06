import React, { useEffect, useState } from 'react';
import "./MainContainer.css";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

import HomeContainer from './HomeContainer';
import RowContainer from './RowContainer';
import {useStateValue} from "../context/StateProvider"
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
  const [{foodItems, cartShow}, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(()=>{},[scrollValue,cartShow]);
  return (
    <div className='mainContainer'>
      <HomeContainer />

      <section>
        <div className='menuitems'>
          <p> Our fresh & healthy fruits</p>
           
          <div className='detailsofmenuitem'>
             <div className='details' onClick={()=>setScrollValue(-200)}>
               <MdChevronLeft/>
             </div>
             <div className='details' onClick={()=>setScrollValue(200)}>
               <MdChevronRight/>
             </div>
          </div>
        </div>


        <RowContainer scrollValue = {scrollValue} flag={true} data={foodItems?.filter((n) =>n.category ==="fruits")}/>
      </section>

      <MenuContainer/>

      {cartShow && (
        <CartContainer/>
      )}

    </div>


  )
}

export default MainContainer