import "./newArticle.css";
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import Axios from "axios";

import jwt from 'jsonwebtoken'

export default function NewUser() {


  const history = useHistory();
const [fullname, setfullname] = useState('')
const [idcoach, setidcoach] = useState('')
const [imagecoach, setimagecoach] = useState('')

const [Images, setImages] = useState('')
const onDrop = (files) => {

  let formData = new FormData();
  const config = {
      header: { 'content-type': 'multipart/form-data' }
  }
  let f= files[0]
  formData.append("file", f)
  //save the Image we chose inside the Node Server 
  Axios.post('https://spacedevfireupbackend.herokuapp.com/api/articles/uploadImage', formData, config)
      .then(response => {
          if (response.data.success) {
            setImages(response.data.fileName)

          } else {
              alert('Failed to save the Image in Server')
          }
          console.log(response)
      })
}

console.log(Images)
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
    createdAt:"",
    coachimage:"",
    coachid:"",
    coachfullname:"",
    Title: "",
    Description: "",
    Category: "",
    Image: "",
    Likes: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChangeFile = (e) => {
    setFormData({ ...formData, Image: e.target.files[0].name });
    onDrop(e.target.files)

  };
  const validate = () => {
    const errors = {};
    if (!Title) {
      errors.Title = "Title is required!";
    }
    if (!Description) {
      errors.Description = "Description is required!";
    }
    if (!Category) {
      errors.Category = "Category is required!";
    }
    if (!Image) {
      errors.Image = "Image is required!";
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
      const [, err] = await  queryApi("articles/add", formData, "POST", false);
      if (err) {
        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
    } else 
    // history.push("/products");
    console.log("yes")
    window.location.href = '/articles'      

    // history.push("/articles")
    }
    
  }, [formErrors]);
  const handleSubmit = async (e) => {
    formData.coachfullname=fullname;
    formData.coachid=idcoach;
    formData.coachimage=imagecoach;
    formData.Image=Images;
    formData.createdAt=dateTime.toLocaleDateString('EN-EN', options);
    console.log(formData.createdAt)
    console.log(dateTime)

    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);

    console.log(formData);
    console.log("formerr:")
    console.log(formErrors);

    console.log(Object.keys(formErrors).length)
   

  };
  console.log("dsasda")

  const { Title,Description,Image ,Category,coachfullname} = formData;
// console.log("daa"+formData.likes)
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Article</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Title</label>

          <input
                name="Title"
                  type="text"
                  placeholder="Title"
                  value={Title}
                  onChange={(e) => onChange(e)}

                />
                        <p>{formErrors.Title}</p>

        </div>

     
        <div className="newUserItem">

<label>Category</label>

        <select name ="Category" value={formData.Category} onChange={(e) => onChange(e)}>
          <option value="">Choose Category</option>
          <option value="Creating your campaign">Creating your campaign</option>
          <option value="Developing your product">Developing your product</option>
          <option value="Managing your compaign">Managing your compaign</option>
          <option value="Marketing">Marketing</option>
          <option value="Planning your compaign">Planning your compaign</option>

        </select>
        <p>{formErrors.Category}</p>

      </div>
        <div className="descriptionitem">
         
        <label>Description</label>
                <textarea
                                                name="Description"
                                                rows="10" cols="50"
                  type="text"
                  value={Description}
                  onChange={(e) => onChange(e)}

                  placeholder="Description"
                />
                        <p>{formErrors.Description}</p>

        </div>
       
      
        <div className="newUserItem">
          <label>Image</label>
         
          <div className="userUpdateRight">
              <div className="userUpdateUpload">
              <img className="userUpdateImg" src={`${process.env.REACT_APP_API_URL_UPLOADS + '/' +Images}`}  />
                  
                {/* <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`https://spacedevfireupbackend.herokuapp.com/uploads/${Images}`} /> */}
                
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" 
                                  onChange={(e) => onChangeFile(e)}

                style={{ display: "none" }} />
              </div>
              <p>{formErrors.Image}</p>

              </div>
        </div>
       
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
