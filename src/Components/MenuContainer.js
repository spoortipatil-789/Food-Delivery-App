import React, { useEffect, useState } from 'react'
import "./MenuContainer.css";
import {IoFastFood} from "react-icons/io5"
import { categories } from './utils/data';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';


const MenuContainer = () => {

  const [filter, setFilter] = useState("chicken");

  const [{foodItems}, dispatch] = useStateValue();

  return (
    <section className='menusection'>
        <div className='menucontainer'>
             <p className='hotdishes'> Our Hot Dishes
             </p>

              

               <div className='menucontainerfordishes'>
               {categories && categories.map(category =>(

                <div key={category.id} onClick={()=>setFilter(category.urlParamName)} className={`menudishes ${filter === category.urlParamName ? "menudishesactice" : "menudishes"}`}>
                            <div className={`dishes ${filter === category.urlParamName ? "activeicon" :"dishes"}`}>
                                 <IoFastFood/>
                            </div>
                            <p className={`categoryname ${filter === category.urlParamName ? "activeiconforcategory" : "categoryname"}`}>{category.name}</p>
                 </div>
               ))}

               </div>

               <div className='menudisheslist'>
                   <RowContainer flag={false} data={foodItems?.filter(n => n.category == filter)}/>
               </div>
               
        </div>
    </section>
  )
}

export default MenuContainer