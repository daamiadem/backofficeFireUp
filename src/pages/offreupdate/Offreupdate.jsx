import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import jwt from 'jsonwebtoken'

import { Link } from "react-router-dom";
import "./offreupdate.css";
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search.jsx"
import Searchtimepicker from "../../components/Searchtimepicker/Searchtimepicker.jsx"

export default function Updateoffer() {
  const { id } = useParams();
  const history = useHistory();
  const [fullname, setfullname] = useState('')
  const [idcoach, setidcoach] = useState('')
  const [childData, setChildData] = useState("");
  const [childData2, setChildData2] = useState("");
  const [searchItem, setSearchItem]= useState("false");
  const [timepickertab, setTimepickertab] = useState(['','']);

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
    state:"",
    rating:0,
    weekend:false
  });

  async function fetchData() {
    console.log("aaaaaaa")
    const [res, err] = await queryApi("offers/find/" + id);
    console.log(res)
    setFormData({
      category:res.category,
      idcoach:res.idcoach,
      datestart:res.datestart,
      title: res.title,
      description: res.description,
      price:res.price,
      image: res.image,
      dateend: res.dateend,
      coachfullname:res.coachfullname,
      type:res.type,
      state:"New",
      rating:1,
      weekend:res.weekend,
    });
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 
  
  
  const onChangeFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0].name });
  };
  const validate = () => {
    
    const errors = {};
    if (!formData.description) {
      errors.description = "description is required!";
    }
    if (!formData.price) {
      errors.price = "price is required!";
    }
    if (timepickertab[0]=="00:00" && timepickertab[1]=="00:00" ) {
      errors.time = "time required";
    }
    if (!childData2 || !childData ) {
      errors.date = "dateend and datestart is required!";
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

  useEffect(async () => {
    console.log(formErrors);
    console.log(isSubmit)
  
    if (Object.keys(formErrors).length === 0 && isSubmit)
    {
    const [, err] = await  queryApi("offers/edit/"+id, formData, "POST", false);
    if (err) {
        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
    } else 
    // history.push("/products");
    console.log("yes")
    // history.push("/articles")
    window.location.href = '/offerlist/'+idcoach       

    }
    
  }, [formErrors]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
    formData.coachfullname=fullname;
    formData.endtime=timepickertab[1]
    formData.starttime=timepickertab[0]
    formData.state="New"
    if (childData!==''&& childData2!==''){
      formData.dateend=setdate(childData2)
      formData.datestart=setdate(childData)
      }
    console.log(formData);
    console.log("formerr:")
    console.log(formErrors);

    console.log(Object.keys(formErrors).length)
   

  };
  console.log("dsasda")



const onChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  return (
    
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Offer</h1>
      
        <Link to="/newArticle">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
       
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <div className="newUserItem">
        
        {!searchItem && <Search passChildData={setChildData}  passChildData2={setChildData2}/>}
    <button onClick={()=> setSearchItem(!searchItem) } className="banner_searchbutton" variant="outlined">{!searchItem ? "Hide" : "Show Date"}</button>
    <p>{formErrors.date}</p>
    <Searchtimepicker passtimedata={setTimepickertab}/>
      <p>{formErrors.time}</p>
    </div>
          <form onSubmit={handleSubmit} className="userUpdateForm">
            <div className="userUpdateLeft">
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
          <option value="">Choose Category</option>
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
 
 
    {/* <div className="newUserItem">
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
          <option value="">Choose Role</option>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>

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
              <button  className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
