import React ,{ useEffect, useState }  from "react";
import { NavLink, useParams } from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'
import styled from "styled-components";
import "./ProjectDetail.css";
import { queryApi } from "../../utils/queryApi";
import { useHistory } from "react-router-dom";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "./bootstrap.min.css"
import $ from "jquery";
export default function ProjectDetail() {
    
  const navigate = useHistory();
  const {id} = useParams();

const [showLoader, setShowLoader] = useState(false);
const [error, setError] = useState({ visible: false, message: "" });
const [formData, setFormData] = useState({
  title: "",
  description: "",
  email : "",
  end_date: "",
  amount_to_collect: "",
  images: "",
  offering_type: "",
  category: "",
  price_per_share: "",
  place:"",
  approved:"",
  approvement_comment:"",

});
async function fetchProject() {
  const [res,err] = await queryApi('project/project/'+id);
  if(res){
    setFormData({title:res.title,approvement_comment : res.approvement_comment,approved:res.approved, description:res.description, email:res.email,end_date:res.end_date,amount_to_collect:res.amount_to_collect,images:res.images, offering_type:res.offering_type,category:res.category,price_per_share:res.price_per_share,place:res.place})
  }
  else console.log(err)
}
useEffect(()=>{

  fetchProject();
},[id])



const { title ,approvement_comment,approved, images,description, email,end_date,amount_to_collect, offering_type,category,price_per_share,place} = formData;


// const onChangeFile = (e) =>{
//   setFormData({ ...formData, images: e.target.files[0].name });}

const onChange = (e) =>
setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e) => {
e.preventDefault();
setShowLoader(true);
const [, err] = await queryApi("project/ApproveProject/" +id, formData, "PUT", false);
if (err) {
  setShowLoader(false);
  setError({
    visible: true,
    message: JSON.stringify(err.errors, null, 2),
  });
  console.log(err)

  console.log(formData)
  console.log(err)
} else    { console.log(formData);
  navigate.push('/projects')
}
};
let date_modified
if(end_date!=null)
date_modified =  new Date(end_date).toLocaleDateString('en-CA')

// const date_modified = end_date.toISOString().split('T')[0]
console.log("modifie "+date_modified)

let hide = false 


function ShowAccreditForm() {

  // var SelectField =  document.getElementById('seeAnotherField').value 
  // if(SelectField=="valide" || SelectField=="hide")
  //  hide=false
  // else   
  //    hide=true 


  //   console.log("SelectField   :"+SelectField)
  //   console.log("hide   :  "+hide)


  $("#seeAnotherField").change(function() {

  if ($(this).val() == "refuse")  {
    hide=true;
    $('#otherFieldDiv').show();
    $('#otherField').attr('required', '');
    $('#otherField').attr('data-error', 'This field is required.');
  } else {
    $('#otherFieldDiv').hide();
    $('#otherField').removeAttr('required');
    $('#otherField').removeAttr('data-error');
  }
});

}
console.log("hide  2 :  "+hide)





// var seeAnotherField = document.getElementById(seeAnotherField)
// console.log("seeAnotherField "+seeAnotherField)

// $("#seeAnotherField").change(function() {

 
//   if ($(this).val() != "refuse" && $(this).val() != "valide")
//   {
//     $('#otherFieldDiv').hide();
//     $('#otherField').removeAttr('required');
//     $('#otherField').removeAttr('data-error');
//   }
//   if ($(this).val() == "refuse" || $(this).val() == "hide") {
//     hide=true;
//     $('#otherFieldDiv').show();
//     $('#otherField').attr('required', '');
//     $('#otherField').attr('data-error', 'This field is required.');
//   } else {
//     $('#otherFieldDiv').hide();
//     $('#otherField').removeAttr('required');
//     $('#otherField').removeAttr('data-error');
//   }
// });


return (
<>
  <Container>


          {/* <NavLink to="/">home2</NavLink> */}
  <h1> Approve or Refuse this Project</h1>
          <form className="mt-5"  onSubmit={onSubmit}>
              <div className="row">

                  <div class="row" >
                  {error.visible && <FormError>{error.message}</FormError>}

                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputEmail1" class="form-label">Title</label>
                      <input type="text" disabled  name="title"value={title}  onChange={(e) => onChange(e)} placeholder="Name of your project " class="form-control"   />
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Email</label>
                      <input type="email" placeholder="john@gmail.com" name="email" value={email}  onChange={(e) => onChange(e)}class="form-control" disabled/>
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Date of end</label>
                      <input type="date" value={date_modified} name="end_date" onChange={(e) => onChange(e)}  placeholder="date of end" class="form-control"disabled />
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Amount to collect</label>
                      <input type="number" name="amount_to_collect" value={amount_to_collect}  onChange={(e) => onChange(e)} placeholder="How much money you need to raise "class="form-control"  disabled/>
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Offering type</label>
                    
             
                 <input type="text"  name="offering_type" value={offering_type}  onChange={(e) => onChange(e)} class="form-control" disabled/>




                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Category</label>

                      <input type="text"  name="category" value={category}  onChange={(e) => onChange(e)} class="form-control" disabled/>

                    
                           
                </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Price per share
</label>
                      <input type="text"  name="price_per_share" value={price_per_share}  onChange={(e) => onChange(e)} placeholder="price per share" class="form-control" disabled/>
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" class="form-label">Place</label>
                      <input type="text" name="place" value={place}  onChange={(e) => onChange(e)} placeholder="Place"  class="form-control" disabled/>
                  </div>
                  <div class="mb-3 col-lg-12 col-md-12 col-12">
                      <label for="exampleInputPassword1" class="form-label">Description</label>
                      <textarea  name="description" value={description}  onChange={(e) => onChange(e)} placeholder="Describe your project"className="form-control" id="" cols="30" rows="5" disabled></textarea>
                  </div>

                  <div class="mb-3 col-lg-12 col-md-12 col-12">


                    <label for="exampleInputPassword1" class="form-label">Do you approve this project ? </label>
                    <select onClick={()=> ShowAccreditForm()} class="form-select" id="seeAnotherField" aria-label="Default select example" 
                value={approved}  name="approved"
                onChange={(e) => onChange(e)} >
                <option value="hide" selected>Choose</option>
                <option value="valide">Approve the project</option>
                <option value="refuse">Refuse the project</option>


                </select>
                </div>
                <div class="mb-3 col-lg-12 col-md-12 col-12" id="otherFieldDiv" >
                      <label for="otherField" class="form-label">The Reasons why you disapprove </label>
                      <textarea  name="approvement_comment" value={approvement_comment}  id="otherField" onChange={(e) => onChange(e)} placeholder="Give tips to improve the project" className="form-control"  cols="30" rows="5" ></textarea>
                  </div>


                  {/* <label for="exampleInputPassword1" class="form-label">Image</label>
                            <div style={{ display: 'flex', width: '350px', height: '240px' }}>

  
<div >
  <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`https://spacedevfireupbackend.herokuapp.com/uploads/${images}`} />
</div>


</div>       */}

          <div>
                  <button type="submit"  disabled={showLoader} class="newUserButton">Confirm </button></div>
                  <br></br>
              </div>
          </form>
      </Container>
  </>
)

}

const FormError = styled.p`
color: #f74b1b;
`;


const Container = styled.div`
  padding:5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

`;
