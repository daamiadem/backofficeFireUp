import { useState, useEffect } from "react";
import "./SignupCoach.css";
import "./test.min.css";

import styled from "styled-components";
import { queryApi } from "../../utils/queryApi";
import { Link } from "react-router-dom";

    
const LoginCoach = ({toggleSideBar}) => {
       useEffect(() => {
      toggleSideBar();
      localStorage.setItem('token', false)

      },[]);
      const [msg, setMsg] = useState("");

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [admintest, setadmintest] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    console.log(formValues);
    // if (Object.keys(formErrors).length != 0){
      // if (formValues.email==="admin@gmail.com" && formValues.password==="azerty123")
      // {
      // setadmintest(true)
      //  localStorage.setItem('token', 'admin')
      // window.location.href = '/dashboard'

      // }
      if (!admintest){

console.log("it worked mf");
      try{
    const [res, err] = await  queryApi("coach/login", formValues, "POST", false);
    console.log(res)
    if (err) {
console.log("aaaa")
        setFormErrors({
        visibile: true,
        message: JSON.stringify(err.errors, null, 2),
      });
      setMsg(err.message);
      console.log(err)
    } 
  
    else {

    // history.push("/products");
    console.log("yes")
  console.log (res)
  console.log("hhihi")
  if (res.admin){
    setIsSubmit(true);
    localStorage.setItem('token', res.admin)

    alert('login successfully')
    window.location.href = '/dashboard'

  }

    if (res.coach) {
      setIsSubmit(true);
			localStorage.setItem('token', res.coach)
      alert('login successfully')
      window.location.href = '/dashboard'
    }
  }

  }
  catch (error){
    console.log(error)
    alert("internal problem")
  }
}
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
  

    return errors;
  };

  return (
        <Wrapper>

    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
         ''
      )}
       

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
      
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>

        
          <button className="fluid ui button blue">Submit</button>
          {msg && <div className="error_msg">{msg}</div>}

          <label>Don't have an account?   </label>
        <Link to="/register" className="link">
Signup now</Link>
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

export default LoginCoach;
