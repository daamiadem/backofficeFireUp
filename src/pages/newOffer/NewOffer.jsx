import "./newOffer.css";
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import Search from "../../components/Search/Search.jsx"
import Searchtimepicker from "../../components/Searchtimepicker/Searchtimepicker.jsx"
import Axios from "axios";

import { Calendar } from 'react-date-range';

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import jwt from 'jsonwebtoken'


export default function NewUser() {


const history = useHistory();
const [fullname, setfullname] = useState('')
const [idcoach, setidcoach] = useState('')
const [imagecoach, setimagecoach] = useState('')
const [searchItem, setSearchItem]= useState("false");
// const [Images, setImages] = useState('')
// const onDrop = (files) => {

//   let formData = new FormData();
//   const config = {
//       header: { 'content-type': 'multipart/form-data' }
//   }
//   let f= files[0]
//   formData.append("file", f)
//   //save the Image we chose inside the Node Server 
//   Axios.post('http://localhost:3008/articles/uploadImage', formData, config)
//       .then(response => {
//           if (response.data.success) {
//             setImages(response.data.fileName)

//           } else {
//               alert('Failed to save the Image in Server')
//           }
//           console.log(response)
//       })
// }

  async function populateQuote() {
		const req = await fetch('https://spacedevfireupbackend.herokuapp.com/api/coach/getcoachjwt', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setfullname(data.fullname)
      setidcoach(data.id);
      setimagecoach(data.image);
		} else {
			alert(data.error)
		}
	}

  useEffect(() => {
    console.log("tesstt")

		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/')
        console.log("11111")
			} else {
				populateQuote()
        console.log("2222")

			}
		}
	}, [])

  
  console.log("aaaaa")
  console.log(fullname)
  const [formData, setFormData] = useState({
    
    category:"",
    type:"",
    idcoach:"",
    datestart:"",
    title: "",
    description: "",
    price: "",
    image: "",
    dateend: "",
    coachfullname:"",
    rating:2,
    starttime:"",
    endtime:"",
    weekend:true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [childData, setChildData] = useState("");
  const [childData2, setChildData2] = useState("");
 
  const [timepickertab, setTimepickertab] = useState(['','']);

  console.log(timepickertab)
  console.log(timepickertab[0])

  console.log(timepickertab[1])

  let date = new Date('2013-08-03T02:00:00Z');
  console.log(date)
let year = date.getFullYear();
console.log(year)



  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const onChangeFile = (e) => {
  //   setFormData({ ...formData, Image: e.target.files[0].name });
  // };
  const validate = () => {

    const errors = {};
    if (!formData.description) {
      errors.description = "description is required!";
    }
    if (!formData.price) {
      errors.price = "price is required!";
    }
   
    if (!childData2 || !childData ) {
      errors.date = "dateend and datestart is required!";
    }
    if (timepickertab[0]=="00:00" && timepickertab[1]=="00:00" ) {
      errors.time = "time required";
    }
    if (!formData.category) {
      errors.category = "category is required!";
    }
   
    if (!formData.title) {
      errors.title = "title is required!";
    }
    if (!formData.type) {
      errors.type = "type is required!";
    }

    return errors;
  };
  
  var dateTime = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(async () => {
    console.log(formErrors);
    console.log(isSubmit)
  
    if (Object.keys(formErrors).length === 0 && isSubmit)
    {
      const [, err] = await  queryApi("offers/add", formData, "POST", false);
      if (err) {
        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
    } else 
    // history.push("/products");
    console.log("yes")
    window.location.href = '/offerlist/'+idcoach      

    // history.push("/articles")
    }
    
  }, [formErrors]);
  console.log(searchItem)

  function setdate(childData){
    let  year = childData.getFullYear();
    let month = childData.getMonth()+1;
    let dt = childData.getDate();
    
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let test1=year+'-' + month + '-'+dt
    return test1
  }
  if (childData!=='')
  console.log(setdate(childData))
  const handleSubmit = async (e) => {
    formData.coachfullname=fullname;
    formData.idcoach=idcoach;
    formData.image=imagecoach;
    formData.endtime=timepickertab[1]
    formData.starttime=timepickertab[0]
 
    if (childData!==''&& childData2!==''){
    formData.dateend=setdate(childData2)
    formData.datestart=setdate(childData)
    }
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);


   

  };
  // function  handleSelect(date){
  //   console.log(date); 
  // }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Offer</h1>
      <div className="banner_search">
      {/* <Calendar
        date={new Date()}
        onChange={handleSelect}
      /> */}
 

        {!searchItem && <Search passChildData={setChildData}  passChildData2={setChildData2}/>}
    <button onClick={()=> setSearchItem(!searchItem) } className="banner_searchbutton" variant="outlined">{!searchItem ? "Hide" : "Show Date"}</button>
    <p>{formErrors.date}</p>

    <Searchtimepicker passtimedata={setTimepickertab} />
      <p>{formErrors.time}</p>
    </div>
      <form onSubmit={handleSubmit} className="newUserForm">
    
        <div className="newUserItem">
          <label>Title</label>
      
          <input
                name="title"
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => onChange(e)}

                />
                        <p>{formErrors.title}</p>

        </div>
        <div className="newUserItem">

        <label>Type</label>

                <select name="type" value={formData.type} onChange={(e) => onChange(e)}>
                  <option value="">Choose Role</option>
                  <option value="Contractor">Contractor</option>
                  <option value="Investor">Investor</option>
                </select>
                <p>{formErrors.type}</p>

              </div>
              <div className="newUserItem">

<label>Work on Weekends?</label>

        <select name="weekend" value={formData.weekend} onChange={(e) => onChange(e)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

      </div>
     
{/*      
        <div className="newUserItem">
    
          <label>Start date</label>
      
          <input
                name="datestart"
                  type="date"
                  placeholder="Start date"
                  value={formData.datestart}
                  onChange={(e) => onChange(e)}

                />
                        <p>{formErrors.datestart}</p>

        </div> */}

     
       
        <div className="newUserItem">
          <label>price</label>
      
          <input
                name="price"
                  type="text"
                  placeholder="price"
                  value={formData.price}
                  onChange={(e) => onChange(e)}

                />
                        <p>{formErrors.price}</p>

        </div>
        {/* <div className="newUserItem">
        <label>End date</label>
                <input
                                name="dateend"

                  type="date"
                  placeholder="End date"
                  onChange={(e) => onChange(e)}
                  value={formData.dateend}

                  className="userUpdateInput"
                />
                        <p>{formErrors.dateend}</p>

        </div> */}
     
        <div className="newUserItem">

<label>Category</label>

        <select name ="category" value={formData.category} onChange={(e) => onChange(e)}>
          <option value="">Choose Category</option>
          <option value="bronze">bronze</option>
          <option value="silver">silver</option>
          <option value="gold">gold</option>

        </select>
        <p>{formErrors.category}</p>

      </div>
        <div className="descriptionitem">
         
        <label>Description</label>
                <textarea
                                                name="description"
                                                rows="10" cols="50"
                  type="text"
                  value={formData.description}
                  onChange={(e) => onChange(e)}

                  placeholder="Description"
                />
                        <p>{formErrors.description}</p>

        </div>
       
      
        {/* <div className="newUserItem">
          <label>Image</label>
         
          <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={"../images/"+image}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" 
                                  onChange={(e) => onChangeFile(e)}

                style={{ display: "none" }} />
              </div>
              <p>{formErrors.image}</p>

              </div>
        </div> */}
       
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
