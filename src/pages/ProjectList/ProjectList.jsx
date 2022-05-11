import "./ProjectList.css";
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

// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "./bootstrap.min.css"


export default function ProjectList() {



    const [projects,err,reload] = useApi('project');
    const [projectsNotApp] = useApi('project');

    const deleteProject= async (id)=>{
    //     const[,err] = await queryApi('project/deleteproject/'+id,{},'DELETE',false);
    //     if(err){
    //         console.log(err);
    //     } else await reload();
     }

    
  return (   <>


       <div>

        <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',color:'darkblue'}}>Manage Approved  Projects</h1>

<NavLink to='/projectsToApprove' className="btn btn-success ">New Projects To Approve </NavLink>
<NavLink to='/RefusedProjects' className="btn btn-danger "> Refused Projects  </NavLink>

                        <table className="table">
                                <thead className="thead-light">
                                  
                                            <tr className="table-light">
                                                <th scope="col">Title</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Amount to collect </th>
                                                <th scope="col">Collected Amount</th>
                                                <th scope="col">End Date</th>
                                                {/* <th scope="col"></th> */}
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
{/* 
                                                <td className="d-flex justify-content-between">
                                          <button className="btn btn-success"  ><RemoveRedEyeIcon /></button>
                                                    
                                                    <button className="btn btn-danger"  ><DeleteOutlineIcon /></button>

                                                    
                                                </td> */}
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