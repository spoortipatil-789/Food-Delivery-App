import React from 'react'
import "./HomeContainer.css"
import Delivery from "./fdimg/delivery.png"
import Hero from "./fdimg/heroBg.png"
import { heroData } from './utils/data'


const HomeContainer = () => {
  return (
    <section className='homecontainer' id='home'>
       <div className='homecontainer-item1'>

        <div className='subcontainer-item1'>
            <p >Bike Delivery</p>
           <div className='deliveryimg'>
              <img src={Delivery} alt="delivery"></img>
           </div>
        </div>

        <p id='deliverypara'>The Fastest Delivery in your city</p>

        <p id='deliverysentence'>Lorem ipsum, dolar sit amet consectetur adipisicing elit, minis velit eaque fugit distincing est nam voluptatum architect
           porro iusto deseurt recusandae ipsa minus eos sunt dolors illo repellat facere suscipit!
        </p>


      <button type='button' className='orderbutton'>Order Now</button>
       </div>

       <div className='homecontainer-item2'>

           <img src={Hero} alt="herobg"/>

            <div  className='subcontainer-item2'>
                {heroData && heroData.map(n =>(
                    <div key={n.id} className='subcontaineritems'>
                 <img src={n.imagesrc} alt="I1"/>


                 <p id='icecream'>{n.name}</p>


                 <p id='chocolate'>{n.desp}</p>

                 <p id='rupee'>$ {n.price}</p>
              </div>
                ))}

            </div>

       </div>
    </section>
  )
}

export default HomeContainer