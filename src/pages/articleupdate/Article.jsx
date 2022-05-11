import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import jwt from 'jsonwebtoken'
import Axios from "axios";

import { Link } from "react-router-dom";
import "./article.css";
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const history = useHistory();
  const [fullname, setfullname] = useState('')
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
  async function populateQuote() {
		const req = await fetch('https://spacedevfireupbackend.herokuapp.com/api/coach/getcoachjwt', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setfullname(data.fullname)
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
    coachfullname:'',
    Title: "",
    Description: "",
    Category: "",
    Image: "",
    Likes: 5,
  });

  async function fetchData() {
    console.log("aaaaaaa")
    const [res, err] = await queryApi("articles/find/" + id);
    console.log(res)
    setFormData({
      Title: res.Title,
      Description: res.Description,
      Image: res.Image,
      Likes: res.Likes,
      Category:res.Category,
    });
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 
  
  
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
      console.log("yesssdsd")
    }
   

    return errors;
  };

  useEffect(async () => {
    console.log(formErrors);
    console.log(isSubmit)
  
    if (Object.keys(formErrors).length === 0 && isSubmit)
    {
    const [, err] = await  queryApi("articles/edit/"+id, formData, "POST", false);
    if (err) {
        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
    } else 
    // history.push("/products");
    console.log("yes")
    // history.push("/articles")
    window.location.href = '/articles'      

    }
    
  }, [formErrors]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
    formData.coachfullname=fullname;
    formData.Image=Images;

    console.log(formData);
    console.log("formerr:")
    console.log(formErrors);

    console.log(Object.keys(formErrors).length)
   

  };
  console.log("dsasda")

  const { Title,Description,Image ,Category} = formData;

console.log(Title)
console.log("mtaaaaa")
const onChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  return (
    
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Article</h1>
        <Link to="/newArticle">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
       
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={handleSubmit} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                name="Title"
                  type="text"
                  placeholder="Title"
                  value={Title}
                  onChange={(e) => onChange(e)}

                  className="userUpdateInput"
                />
              </div>
              <p>{formErrors.Title}</p>
              <div className="newUserItem">

<label>Category</label>

        <select name ="Category" value={Category} onChange={(e) => onChange(e)}>
          <option value="">Choose Category</option>
          <option value="Creating your campaign">Creating your campaign</option>
          <option value="Developing your product">Developing your product</option>
          <option value="Managing your compaign">Managing your compaign</option>
          <option value="Marketing">Marketing</option>
          <option value="Planning your compaign">Planning your compaign</option>

        </select>
        <p>{formErrors.Category}</p>

      </div>

              <div className="userUpdateItem">
              <label>Description</label>
                <textarea
                                                name="Description"
                                                rows="10" cols="50"
                  type="text"
                  value={Description}
                  onChange={(e) => onChange(e)}

                  placeholder="Description"
                />
              </div>
             
            
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={`${process.env.REACT_APP_API_URL_UPLOADS + '/' + Images}`}                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" 
                                  onChange={(e) => onChangeFile(e)}

                style={{ display: "none" }} />
              </div>
              <button  className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
