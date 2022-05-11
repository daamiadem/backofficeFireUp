import "./offerlist.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect,Suspense } from "react";
import { deleteOffer, selectArticles } from "../../redux/slices/offersSlice";
import { deleteUser, selectUsers } from "../../redux/slices/usersSlice";
import { useApi } from "../../hooks/useApi";
import { useHistory } from "react-router-dom";
import jwt from 'jsonwebtoken'
import { useParams } from "react-router-dom";

import { queryApi } from "../../utils/queryApi";

export default function Offerlist(props) {
  const history = useHistory();
  const { id } = useParams();
  const [test,setTest] = useState(false)
  const [offers,setoffers]= useState(null)
  async function fetchData() {
    console.log("aaaaaaa")
    const [res, err] = await queryApi("offers/findallbyid/" + id);
    console.log(res)

    setoffers(res);
  }
  useEffect( () => {
    fetchData()
       }, [id,test]);
       console.log(id)
  const dispatch = useDispatch();
  const deletearticleComponent = async (id) => {
    setTest(true)
    console.log("yes")
    const [, err] = await queryApi("offers/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else
    setTest(false)

    dispatch(deleteOffer(id));
  };
   console.log(offers); 
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "title",
      width: 120,
      renderCell: (params) => {
        console.log(params)
        return (
          // src={require ('../../images/'+params.row.Image).default} 

          <div className="userListUser">
            {params.row.title}
          </div>
        );
      },
    },
    { field: "category", headerName: "category", width: 135 },

    {
      field: "type",
      headerName: "type",
      width: 105,
    },
    {
      field: "dateend",
      headerName: "End date",
      width: 135,
    },
    {
      field: "datestart",
      headerName: "Start date",
      width: 145,
    },
    {
      field: "state",
      headerName: "State",
      width: 120,
    },
    {
      field: "price",
      headerName: "price",
      width: 110,
    },
    {
      field: "description",
      headerName: "description",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/offer/" + params.row._id}>
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
       <Link to="/newOffer">
  <button className="userAddButton">Create</button>
</Link>
<Suspense fallback={<h1>Chargement du profil...</h1>}>
{offers ?  ( <DataGrid
getRowId={(row) => row._id}
  rows={offers}
  disableSelectionOnClick
  columns={columns}
  pageSize={8}
  checkboxSelection
/>) :('<p>sdadsaads</p>') }
          </Suspense>

    </div>
  );
}