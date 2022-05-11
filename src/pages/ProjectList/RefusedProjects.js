import "./ProjectList.css";
import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { queryApi } from '../../utils/queryApi';
import axios from 'axios';
import { useApi } from "../../hooks/useApi";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, useParams } from 'react-router-dom'
import PostAddIcon from '@mui/icons-material/PostAdd';
import "./bootstrap.min.css"
import { useHistory } from "react-router-dom";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import "bootstrap/dist/css/bootstrap.min.css"
export default function RefusedProjects() {


    const navigate = useHistory();

    const [projects,err,reload] = useApi('project/getRefusedProjects');

    const deleteProject= async (id)=>{
    //     const[,err] = await queryApi('project/deleteproject/'+id,{},'DELETE',false);
    //     if(err){
    //         console.log(err);
    //     } else await reload();
     }

    
  return (   <>


       <div>

        <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',color:'darkblue'}}>Refused Projects</h1>

{/* <button className="btn btn-primary "> Not approved Projects  </button> */}
                        <table className="table">
                                <thead className="thead-light">
                                  
                                            <tr className="table-light">
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Amount to collect </th>
                                                <th scope="col">Collected Amount</th>
                                                <th scope="col">End Date</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        { projects  ?  (
                                projects.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <td scope="row">{element.title}</td>
                                                <td>{element.description}</td>
                                                <td>{element.amount_to_collect} $</td>
                                                
                                                
                                                {(() => {
                                                if (element.collected_amount!=null){
                                                    return (
                                                        <td>{element.collected_amount } $</td>
                                                    )
                                                }
                                                else
                                                return <td>0 $</td>
                                                })()}

                                                <td>{ (new Date(element.end_date)).toLocaleDateString()}  </td>

                                                <td className="d-flex justify-content-between">
                                          <NavLink to={'/ProjectDetail/'+element._id} className="btn btn-success"  ><RemoveRedEyeIcon /></NavLink>
                                                    

                                                    
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })) : ( <p> You have not projects yet </p>)
                            }                    
                                        </tbody>
                                    </table>
</div>


        </>
    )
}