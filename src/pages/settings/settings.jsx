import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./settings.css";
import { queryApi } from "../../utils/queryApi";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

export default function Settings(props) {



  console.log(props.idcoach)
  const { id } = useParams();
  const history = useHistory();
  const [test, setTest] = useState(false);
  const [img, setImg] = useState('');

  const [formData, setFormData] = useState({
    oldpassword:"",
    Password: "",
    verifypassword: "",
    FirstName:  "",
      Lastname: "",
      Adress:  "",
      Email:  "",
      Dateofbirth: "",
      image:  "",
      Number:  "",
  });



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


  async function fetchData() {
    console.log("aaaaaaa")
    const [res, err] = await queryApi("coach/find/" + id);
    console.log(res)
    setFormData({
      
      FirstName: res.FirstName,
      Lastname: res.Lastname,
      Adress: res.Adress,
      Email: res.Email,
      Dateofbirth:res.Dateofbirth,
      image: res.image,
      Number: res.Number,
    });
setImg(res.image)
setImages(res.image)
  } 
  console.log("old"+img)

  useEffect( () => {
    fetchData()

    console.log(props.idcoach)
       }, [id]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChangeFile = (e) => {
    onDrop(e.target.files)

    setFormData({ ...formData, image: e.target.files[0].name });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 4) {
      errors.Password = "Password must be more than 4 characters";
    } else if (values.Password.length > 10) {
      errors.Password = "Password cannot exceed more than 10 characters";
    }
    if (!values.oldpassword) {
      errors.oldpassword = "old Password is required";
    }
    if (values.Password!=values.verifypassword) {
      errors.verifypassword="Password not the same"
    }

   
    return errors;
  };

  useEffect(async () => {
          console.log(Images)
    console.log(formData.image)
          console.log(formData);
    if (Object.keys(formErrors).length === 0 && isSubmit )
    {
      const [, err] = await  queryApi("coach/edit2/"+id, formData, "POST", false);
      if (err) {
        setTest(true)
  
          setFormErrors({
          visibile: true,
          message: JSON.stringify(err.errors, null, 2),
        });
      } else {
        setTest(false)

      toast.dark(`${formData.FirstName} 🤵 Password changed Sucessfully `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      // history.push("/products");
      console.log("yes")
      }
      console.log(formData);

  }
  if (Object.keys(formErrors).length !== 0 && isSubmit && img!==Images)
  {

    const [, err] = await  queryApi("coach/edit/"+id, formData, "POST", false);
    if (err) {
      setTest(true)

        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
    } else {
setFormErrors({
          visibile: false,
        });
        setIsSubmit(false);

        window.location.reload()
    // history.push("/products");
    console.log("yes")
    }
    console.log(formData);

}
  }, [formErrors,Images]);
 



  const handleSubmit = async (e) => {
    if (Images!=='')
    formData.image=Images;

    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
   
    // if (Object.keys(formErrors).length != 0){
    
  };
  console.log("dsasda")




  return (

    <div className="user">
            <ToastContainer />

      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Coach</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
 src={`${process.env.REACT_APP_API_URL_UPLOADS + '/' + formData.image}`}                      alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{formData.FirstName} {formData.Lastname} </span>
              <span className="userShowUserTitle">Coach</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.FirstName} {formData.Lastname}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.Dateofbirth}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.Number}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.Email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.Adress}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
            <div className="userUpdateItem">
                <label>old Password</label>
                <input
                name="oldpassword"
                  type="password"
                  placeholder="old password"
                  value={formData.oldpassword}
                  onChange={(e) => onChange(e)}

                  className="userUpdateInput"
                />
              </div>
              <p>{formErrors.oldpassword}</p>

              {test ? (<p>wrong old password </p>) :('') }

              <div className="userUpdateItem">
                <label>new Password</label>
                <input
                  name="Password"
                  type="password"
                  placeholder="new password"
                  value={formData.Password}
                  onChange={(e) => onChange(e)}

                  className="userUpdateInput"
                />
              </div>
              <p>{formErrors.Password}</p>

              <div className="userUpdateItem">
                <label>retype password</label>
                <input
                name="verifypassword"
                  type="password"
                  value={formData.verifypassword}
                  onChange={(e) => onChange(e)}

                  placeholder="reenterpassword"
                  className="userUpdateInput"
                />
              </div>
              <p>{formErrors.verifypassword}</p>


            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              {Images ? ( <img
                  className="userUpdateImg"
                  src={`${process.env.REACT_APP_API_URL_UPLOADS + '/' + Images}`}                    alt=""
                />) :('') }

               
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" 
                                  onChange={(e) => onChangeFile(e)}

                style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
