import "./articleList.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect,Suspense } from "react";
import { deleteArticle, selectArticles } from "../../redux/slices/articlesSlice";
import { deleteUser, selectUsers } from "../../redux/slices/usersSlice";
import { useApi } from "../../hooks/useApi";
import { useHistory } from "react-router-dom";
import jwt from 'jsonwebtoken'

import { queryApi } from "../../utils/queryApi";

export default function UserList(props) {
  const history = useHistory();

  const dispatch = useDispatch();
   const [articles] = useSelector(selectArticles);
  const deletearticleComponent = async (id) => {
    console.log("yes")
    const [, err] = await queryApi("articles/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else 
    console.log("rr")
     dispatch(deleteArticle(id));
  };



   console.log(articles);
  
  
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "Title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          // src={require ('../../images/'+params.row.Image).default} 

          <div className="userListUser">
            <img className="userListImg"                  src={`${process.env.REACT_APP_API_URL_UPLOADS + '/' + params.row.Image}`}   alt="" />
            {params.row.Title}
          </div>
        );
      },
    },
    { field: "Category", headerName: "Category", width: 200 },
    {
      field: "Likes",
      headerName: "Likes",
      width: 120,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/article/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => deletearticleComponent(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (

    <div className="userList">
       <Link to="/newArticle">
  <button className="userAddButton">Create</button>
</Link>
<Suspense fallback={<h1>Chargement du profil...</h1>}>

      <DataGrid

      getRowId={(row) => row._id}
        rows={articles}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
          </Suspense>

    </div>
  );
}