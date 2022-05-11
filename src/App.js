

import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import SignupCoach from "./pages/coach/SignupCoach";
// import Logincoach from "./pages/coach/LoginCoach";

import Offerlist from "./pages/offerlist/offerlist";

import OfferticketList from "./pages/offerticketList/index";

import Updateoffer from "./pages/offreupdate/Offreupdate";
import Newoffer from "./pages/newOffer/NewOffer";
import React, { Suspense,useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/slices/usersSlice";
import { fetchArticles } from "./redux/slices/articlesSlice";
import { fetchticketsbyid } from "./redux/slices/ticketsSlice";

import { fetchArticlesbyid } from "./redux/slices/articlesSlice";
import jwt from 'jsonwebtoken'
import { useHistory } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Investor from "./pages/Investor/Investor";
// import Coach from "./pages/Coach/Coach";
import Entrepreneur from "./pages/Entrepreneur/Entrepreneur";
import ProjectList from "./pages/ProjectList/ProjectList";
import Product from "./pages/project/Project";
import NewProduct from "./pages/newProject/NewProject";
import InvestorList from './pages/InvestorList/InvestorList'
import CoachList from './pages/CoachList/CoachList'
import EntrepreneurList from './pages/EntrepreneurList/EntrepreneurList'
import InvestementList from './pages/investementList/investementList'
import WaitingToApproveProjectList from "./pages/ProjectList/WaitingToApproveProjectList";
import ProjectDetail from "./pages/ProjectList/ProjectDetail";
import RefusedProjects from "./pages/ProjectList/RefusedProjects";
import Event from "./pages/Event/Event";
import EventList from "./pages/EventList/EventList";
import NewEvent from "./pages/NewEvent/newEvent";
import AddEvent from "./pages/addEvent/addEvent";

import Booking from "./pages/Booking/Booking";
import BookingList from "./pages/BookingList/BookingList";



function App() {
  console.log(process.env.REACT_APP_API_URL_UPLOADS)
  const [idcoach, setidcoach] = useState('')
  const [name, setname] = useState('')

  const [image, setimage] = useState('')

  const history = useHistory();

  
  const dispatch = useDispatch();

  useEffect(async () => {
    async function populateQuote() {

      const req = await fetch('https://spacedevfireupbackend.herokuapp.com/api/coach/getcoachjwt', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      console.log(req)
  
      const data = await req.json()
      if (data.status === 'ok') {
        console.log("davaiblyat")
        console.log(data.id)
        setidcoach(data.id)
        setname(data.fullname)
        setimage(data.image)

        dispatch(fetchArticlesbyid(idcoach));
        dispatch(fetchticketsbyid(idcoach));

      } else {
        console.log(data.error)
      }
    }
    console.log("tesstt")

		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user && showSidebar) {
				localStorage.removeItem('token')
        window.location.href = '/'      
			} else {
		  		populateQuote()
        console.log("22221")
        console.log(idcoach)


			}
		}
    	}, [dispatch,idcoach])




  const SignupCoach = React.lazy(() => import('./pages/coach/SignupCoach'));
  const Logincoach = React.lazy(() => import('./pages/coach/LoginCoach'));
  const UserList = React.lazy(() => import('./pages/articleList/ArticleList'));
  // const offerticketList = React.lazy(() => import('./pages/offerticketList'));
  const Topbar = React.lazy(() => import('./components/topbar/Topbar'));
  const Sidebar = React.lazy(() => import('./components/sidebar/Sidebar'));

  const User = React.lazy(() => import('./pages/articleupdate/Article'));
  const NewUser = React.lazy(() => import('./pages/newArticle/NewArticle'));
  const Settings = React.lazy(() => import('./pages/settings/settings'));
  const EmailVerify = React.lazy(() => import('./components/EmailVerify/index'));

  const [showSidebar,setShowSidebar] = React.useState();

const handleToggleSideBar = () => {
//togglesidebar with useState
setShowSidebar(true);
console.log("test")
}
  return (
    <Suspense fallback={<div>Chargement...</div>}>

    <Router>
      
            {!showSidebar &&  <Topbar imagee={image}  nom={name} id={idcoach}/>}

      <div className="container">
    
      {!showSidebar &&  <Sidebar id={idcoach} />}

        <Switch>
        <Route path="/Events">
            <EventList />
          </Route>
       
          <Route path="/newEvent">
              <NewEvent />
            </Route>
            <Route path="/addEvent">
              <AddEvent />
            </Route>

          <Route path="/Bookings">
            <BookingList />
          </Route>
<Route path="/Event/:EventId">
            <Event />
          </Route>
          <Route path="/Booking/:BookingId">
            <Booking />
          </Route>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/Investors">
            <InvestorList />
          </Route>
          <Route path="/Investment">
            <InvestementList />
          </Route>
          <Route path="/Entrepreneurs">
            <EntrepreneurList />
          </Route>
          <Route path="/Coachs">
            <CoachList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/Investor/:InvestorId">
            <Investor />
          </Route>
          <Route path="/Entrepreneur/:EntrepreneurId">
            <Entrepreneur />
          </Route>
          {/* <Route path="/Coach/:CoachId">
            <Coach />
          </Route> */}
        
          <Route path="/projects">
            <ProjectList />
          </Route>
          <Route path="/Project/:ProjectId">
            <Product />
          </Route>
          <Route path="/newProject">
            <NewProduct />
          </Route>
          <Route path="/projectsToApprove">
            <WaitingToApproveProjectList />
          </Route>
          <Route path="/ProjectDetail/:id">
            <ProjectDetail />
          </Route>  RefusedProjects
          <Route path="/RefusedProjects">
            <RefusedProjects />
          </Route> 

          <Route path="/" exact render={(props) => <Logincoach  toggleSideBar={handleToggleSideBar } {...props} />} />

          
          <Route path="/register" exact render={(props) => <SignupCoach  toggleSideBar={handleToggleSideBar } {...props} />} />
          <Route exact path="/dashboard">

            <Home />
          </Route>
          
         
          <Route  path="/coach/:id/verify/:token" exact render={(...props) => <EmailVerify toggleSideBar={handleToggleSideBar } {...props} />} />

          <Route  path="/articles" exact render={(...props) => <UserList />} />

          <Route  path="/settings/:id" exact render={(props) => <Settings idcoach={idcoach} />} />

         
          <Route path="/article/:id">
            <User />
          </Route>
          <Route path="/newArticle">
            <NewUser />
          </Route>

          
          <Route path="/OfferticketList/:id">
            <OfferticketList />
          </Route>
          <Route path="/offerlist/:id">
            <Offerlist />
          </Route>
          <Route path="/offer/:id">
            <Updateoffer />
          </Route>
          <Route path="/newoffer">
            <Newoffer />
          </Route>

         
        </Switch>

      </div>

    </Router>
    </Suspense>

  );
}

export default App;