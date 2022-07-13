import React, { useState } from 'react'
import "./CreateContainer.css"
import {MdFastfood , MdCloudUpload , MdDelete, MdFoodBank, MdAttachMoney} from "react-icons/md"
import { categories } from './utils/data';
import Loader from './Loader';
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { getAllFoodItems, saveItem } from './utils/firebasefunction';
import { storage } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const CreateContainer = () => {

    const [title, setTitle] = useState("");
    const [calories , setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category , setCategory] = useState(null);
    const [fields , setFields] = useState(false);
    const [alertStatus , setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState(null);

    const [{foodItems}, dispatch] = useStateValue();
  

  const uploadimage=(e)=>{
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef= ref(storage,`Images/${Date.now()} -${imageFile.name}`);
    

    const uploadTask = uploadBytesResumable(storageRef , imageFile);
    uploadTask.on("state_changed",(snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },(error)=>{
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("Image uploaded successfully");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false)
        }, 4000);
      })
    })
  };
   



  const deletimage=()=>{

    setIsLoading(true);
    const deletRef = ref(Storage, imageAsset);
    deleteObject(deletRef).then(()=>{
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false)
      }, 4000);
    })
  };



  const savedetails=()=>{
    setIsLoading(true);
    try {
      if((!title || !calories || !imageAsset || !price || !category)){

      setFields(true);
      setMsg("Required fields can't be empty");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
      }
      else{
        const data = {
          id:`${Date.now()}`,
          title:title,
          imageURL:imageAsset,
          category:category,
          calories:calories,
          qty:1,
          price:price,
        }
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded  successfully");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        
        }, 4000);
      }

    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData=()=>{
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  }

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      console.log(data);

      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data,
      })
    })
   }

   fetchData();

  return (
    <div className='createcontainer'>
       <div className='subcontainer'>
             {
              fields && (
                <p className={`fields ${alertStatus === "danger" ? "alertmessg" : "fields"}`}>
                    {msg}
                </p>
              )
             }


             <div className='inputfield'>
             <MdFastfood  className='fastfood'/>
             <input type="text" required className='inputbox' value={title} 
                 onChange={ (event) => setTitle(event.target.value)} placeholder='Give me a title....'/>
             </div>
      
    
        <div className='category'>
            <select className='categoryselection' onChange={(e)=> setCategory(e.target.value) }>

              <option value="other" className='categoryOption'>Select Category</option>

              {
                categories && categories.map(item => (
                  <option className='optionfromdata' key={item.id} value={item.urlParamName}>{item.name}</option>
                ))
              }
            </select>

        </div>

        <div className='loadercomponent'>
               {isLoading ? <Loader/> : <>
                {
                  !imageAsset ? <>
                    <label className='labelforasset'>
                      <div className='divisionforasset'>
                        <MdCloudUpload  className='cloudupload'/>
                        <p>Click Here To Upload</p>
                     
                      <input type="file" name='uploadimage' 
                      accept='image/*' onChange={uploadimage}/>
                      </div>
                    </label>
                  </> : <>
                    <div className='assetimage'>
                      <img src={imageAsset} alt="uploadedimage"></img>
                      <button type='button' onClick={deletimage} className="deletbutton">
                        <MdDelete/>
                      </button>
                    </div>

                  </>
                }
               </>}
        </div>
         

         <div className='foodbankdivision'>

            <div className='subfoodbank'>
               <MdFoodBank className='mdfoodbank'/>
               <input type="text" required placeholder='Calories' value={calories} onChange={(e)=> setCalories(e.target.value)}/>
            </div>


            <div className='subfoodbank'>
               <MdAttachMoney className='mdfoodbank'/>
               <input type="text" required placeholder='Price' value={price} onChange={(e)=> setPrice(e.target.value)}/>
            </div>


         </div>
           <div className='buttonforsavingitem'>
             <button type='button' onClick={savedetails}> Save</button>

           </div>
       </div>
    </div>
  )
}

export default CreateContainer