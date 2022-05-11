import "./offerlist.css";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect,Suspense } from "react";
import { useParams } from "react-router-dom";

import { queryApi } from "../../utils/queryApi";
import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
import "react-big-calendar/lib/sass/styles.scss";
export default function OfferticketList() {
  // const localizer = momentLocalizer(moment)

  const { id } = useParams();
  const [test,setTest] = useState(false)
  const [offers,setoffers]= useState(null)
  const [dates, setdates]= useState([]);
  const [hourlist, setHourlist]= useState([21,1]);

  const [timedata,settimedata] = useState([   ])


  async function fetchData() {
    console.log("aaaaaaa")
    const [res, err] = await queryApi("offerticket/findallbyidforcoach/" + id);
    console.log(res)

    setoffers(res);
  }
  useEffect( () => {
    fetchData()
       }, [id,test]);
       console.log(id)
  // const dispatch = useDispatch();
  const deletearticleComponent = async (id) => {
    setTest(true)
    console.log("yes")
    const [, err] = await queryApi("offerticket/delete/" + id, {}, "GET");
    if (err) {
      console.log(err);
    } else
    setTest(false)

    // dispatch(deleteOffer(id));
  };
  useEffect(() => {
    setHourlist([])
if (offers!==null){
    offers.forEach(element => {console.log(element)
      console.log(element.dateoffer.slice(-2))
      setdates(dates=>[...dates,new Date(element.dateoffer)])
      setHourlist(hourlist=>[...hourlist,parseInt(element.timeoffer.split(':')[0])]) 
      settimedata(timedata=>[...timedata, 
        
        {
        title: "Room: "+element.numroom,
        allDay: false,
        start: new Date(element.dateoffer.slice(0,4),parseInt(element.dateoffer.split('-')[1])-1, element.dateoffer.split('-')[2], element.timeoffer.split(':')[0], 0), // 10.00 AM
        end: new Date(new Date().getFullYear(), parseInt(element.dateoffer.split('-')[1])-1, element.dateoffer.split('-')[2], parseInt(element.timeoffer.split(':')[0])+1, 0) // 2.00 PM
      
    }]) 
    });}

console.log(new Date().getMonth())

    }, [offers]);
    console.log(hourlist)
    console.log(Math.max(...hourlist))
    console.log(Math.min(...hourlist))

  // const dates = [];
  // dates.push(new Date('2011/06/25'));
  // dates.push(new Date('2011/06/26'));
  // dates.push(new Date('2011/06/27'));
  // dates.push(new Date('2011/06/28'));


  const minDate = new Date(Math.min.apply(null, dates));
  const maxDate = new Date(Math.max.apply(null, dates));

console.log(minDate)
console.log(dates)
  const  events=[
    {
      title: "My event",
      allDay: false,
      start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
      end: new Date(2018, 0, 1, 12, 0) // 2.00 PM
    
  },
  {
    title: "here",
    allDay: false,
    start: new Date(2018, 0, 1, 12, 0), // 10.00 AM
    end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
  
}
]

  

   console.log(offers);

  
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    { field: "numroom", headerName: "Room NUM", width: 160 },
    {
      field: "timeoffer",
      headerName: "Offer time",
      width: 160,
    },
    { field: "clientfullname", headerName: "Client", width: 160 },

    {
      field: "dateoffer",
      headerName: "Offer date",
      width: 160,
    },

    {
      field: "createdAt",
      headerName: "Reserved at",
      width: 180,
    },
    {
      field: "state",
      headerName: "State",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
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
  <Calendar
      // localizer={localizer}
      events={timedata}
      step={30}
      view="week"
      views={["week"]}
      min={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Math.min(...hourlist), 0)} // 8.00 AM
      max={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Math.max(...hourlist)+1, 0)} // Max will be 6.00 PM!
      defaultDate={new Date()}
      style={{ height: 500 }}
    />
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