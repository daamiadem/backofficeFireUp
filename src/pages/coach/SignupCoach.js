import { useState, useEffect } from "react";
import "./SignupCoach.css";
import styled from "styled-components";
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

const SignupCoach = ({toggleSideBar}) => {
  const history = useHistory();
	const [msg, setMsg] = useState("");

    useState(() => {
        toggleSideBar();
        },[]);
  const initialValues = { FirstName: "", Lastname: "", Email: "", password: "" ,verifypassword:"",Adress:"",image:"",CV:"",Dateofbirth:"",Number:""};
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [test, setTest] = useState(false);
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

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData({ ...FormData, [name]: value });
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
  const onChangeFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0].name });
    onDrop(e.target.files)
  };
  const onChangeFile2 = (e) => {
    setFormData({ ...formData, CV: e.target.files[0].name });
  };

//   async function registerUser(event) {
// 		event.preventDefault()

// 		const response = await fetch('http://localhost:3008/coach/add', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
//         initialValuestet,
//       			}),
// 		})

// 		const data = await response.json()

// 		if (data.status === 'ok') {
// console.log("yes");		}
// 	}



  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    formData.image=Images;

    console.log(formErrors);
    console.log(formData);
    console.log(isSubmit)
    console.log(Object.keys(formErrors).length)
    // if (Object.keys(formErrors).length != 0){
  //     if (Object.keys(formErrors).length === 0 && isSubmit)
  //   {
  //   const [, err] = await  queryApi("coach/add", formData, "POST", false);
  //   if (err) {
  //       setFormErrors({
  //       visibile: true,
  //       message: JSON.stringify(err.errors, null, 2),
  //     });
  //   } else 
  //   // history.push("/products");
  //   console.log("yes")
  
  // }
};
  useEffect(async () => {
    console.log(formErrors);
    console.log(isSubmit)
  
    if (Object.keys(formErrors).length === 0 && isSubmit)
    {
      console.log(formData);

    const [data, err] = await  queryApi("coach/add", formData, "POST", false);
    if (err) {
      setTest(true)
    console.log(err.error)
        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
    } else {
      console.log(data)
      setMsg(data.message);

    toast.dark(`${formData.FirstName} 🤵 registered Sucessfully `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
      // history.push('/')}
    //  window.location.href = '/'      
    console.log("yes")
  
  }
    
  }, [formErrors]);

  

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexn= /[0-9]/;
    if (!values.Lastname) {
      errors.Lastname = "Lastname is required!";
    }
    if (!values.FirstName) {
      errors.FirstName = "FirstName is required!";
    }
    if (!values.Dateofbirth) {
      errors.Dateofbirth = "date is required!";
    }
    if (!values.Adress) {
      errors.Adress = "Adress is required!";
    }
    console.log('aaa'+test)
    
    if (!values.Email) {
      errors.Email = "Email is required!";
    } else if (!regex.test(values.Email)) {
      errors.Email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
   
    if (values.password!=values.verifypassword) {
      errors.verifypassword="Password not the same"
    }
    if (values.Number.length !== 8 || (!regexn.test(values.Number))) {
      errors.Number = "Number must be 8 numbers";
    }
    return errors;
  };

  return (
        <Wrapper>
        <ToastContainer />

    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
         ''
      )}
       

      <form onSubmit={handleSubmit}>
        <h1>Coach Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
        <div className="field">
            <label>FirstName</label>
            <input
              type="text"
              name="FirstName"
              placeholder="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              />
          </div>
          <p>{formErrors.FirstName}</p>
          <div className="field">
            <label>LastName</label>
            <input
              type="text"
              name="Lastname"
              placeholder="LastName"
              value={formData.Lastname}
              onChange={handleChange}
              />
          </div>
          <p>{formErrors.Lastname}</p>
          <div className="field">
            <label>Adress</label>
            <input
              type="text"
              name="Adress"
              placeholder="Adress"
              value={formData.Adress}
              onChange={handleChange}
            />
          </div>     
          <p>{formErrors.Adress}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Email}</p>
          {test ? (<p>Email exist already </p>) :('') }
          <div className="field">
            <label>Number</label>
            <input
              type="text"
              name="Number"
              placeholder="Number"
              value={formData.Number}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Number}</p>
          <div className="field">
            <label>Date of birth</label>
            <input
              type="date"
              name="Dateofbirth"
              placeholder="Date of birth"
              value={formData.Dateofbirth}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Dateofbirth}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>

          <div className="field">
            <label>Verify Password</label>
            <input
              type="password"
              name="verifypassword"
              placeholder="Verify Password"
              value={formData.verifypassword}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.verifypassword}</p>
          <div className="field">
            <label>image</label>
            <FormField
              type="file"
              name="image"
              placeholder="image"
              onChange={(e) => onChangeFile(e)}
              ></FormField>
          </div>
          <div className="field">
            <label>CV</label>
            <FormField
              type="file"
              name="CV"
              placeholder="CV"
              onChange={(e) => onChangeFile2(e)}
              ></FormField>
          </div>
          <button className="fluid ui button blue">Submit</button>
          {msg && <div className="success_msg">{msg}</div>}

          <label>Already have an account?  </label>
        <Link to="/" className="link">
Login now</Link>
        </div>
      </form>
    </div>
    </Wrapper>

  );
  
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-transform: uppercase;
  color: black;
`;
const FormGroup = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  text-transform: uppercase;
  color: black;
  display: flex;
  flex-direction: column;
  width: 33%;
  align-self: center;
`;
const FormField = styled.input`
  color: black;
  padding: 15px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #ebebeb;
  ::placeholder {
    text-transform: uppercase;
    font-family: "Kiona";
    font-size: large;
    letter-spacing: 0.1rem;
  }
`;
const FormButton = styled.button`
  background: #7b1bf7;
  text-transform: uppercase;
  color: white;
  border-radius: 25px;
  padding: 15px;
  border: 0;
  font-size: large;
  margin: 10px 0;
  font: 200 larger Kiona;
`;
const FormError = styled.p`
  color: #f74b1b;
`;
const Spinner = () => (
  <Loader viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="2"
    />
  </Loader>
);
const Loader = styled.svg`
  animation: rotate 2s linear infinite;
  display: flex;
  align-self: center;
  width: 50px;
  height: 50px;
  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default SignupCoach;
