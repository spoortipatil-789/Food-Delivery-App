
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';

import {CreateContainer , MainContainer} from "./Components"

import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './Components/utils/firebasefunction';
import { useEffect } from 'react';
import { actionType } from './context/reducer';

function App() {
   const [{foodItems}, dispatch] = useStateValue();

   const fetchData = async () => {
    await getAllFoodItems().then(data => {
      console.log(data);

      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data,
      })
    })
   }
   useEffect(()=>{
    fetchData();
   },[]);

  return (
   
    <div className="App">
      <Header/>
    
      <main className='main'>
        <Routes>
          <Route path='/*' element={<MainContainer/>}></Route>
          <Route path='/createitem' element={<CreateContainer />}></Route>
         
        </Routes>
      </main>
    </div>
  
  );
}

export default App;
