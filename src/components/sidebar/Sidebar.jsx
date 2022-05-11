import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  ExitToApp,
  CameraFront,

} from "@material-ui/icons";
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import jwt from 'jsonwebtoken'

import { Link } from "react-router-dom";
export default function Sidebar(props) {
  return (

    (jwt.decode(localStorage.getItem('token'))!==null) &&
    (jwt.decode(localStorage.getItem('token')).testjwt==="coach")?(

    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/articles" className="link">
              <li className="sidebarListItem">
              <ArticleIcon className="sidebarIcon" />
              Articles
            </li>
            </Link>
            <Link to={"/offerlist/"+props.id} className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Offers
              </li>
            </Link>
            <Link to={"/OfferticketList/"+props.id} className="link">
              <li className="sidebarListItem">
                <CameraFront className="sidebarIcon" />
                Offer Reservations
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Logout</h3>
          <ul className="sidebarList">
          <Link to="/" className="link">

            <li className="sidebarListItem">
              <ExitToApp className="sidebarIcon" />
              Logout
            </li>
           </Link>
          </ul>
        </div>
      </div>
    </div>
  ):
  <div className="sidebar">
  <div className="sidebarWrapper">
    <div className="sidebarMenu">
      <h3 className="sidebarTitle">Dashboard</h3>
      <ul className="sidebarList">
        <Link to="/" className="link">
        <li className="sidebarListItem active">
          <LineStyle className="sidebarIcon" />
          Home
        </li>
        </Link>
        <li className="sidebarListItem">
          <Timeline className="sidebarIcon" />
          Analytics
        </li>
        <li className="sidebarListItem">
          <TrendingUp className="sidebarIcon" />
          Sales
        </li>
      </ul>
    </div>
    <div className="sidebarMenu">
      <h3 className="sidebarTitle">Quick Menu</h3>
      <ul className="sidebarList">
      
        <Link to="/Entrepreneurs" className="link">
          <li className="sidebarListItem">
            <PermIdentity className="sidebarIcon" />
            Entrepreneurs
          </li>
        </Link>
        
        <Link to="/Investors" className="link">
          <li className="sidebarListItem">
            <PermIdentity className="sidebarIcon" />
            Investors
          </li>
        </Link>
        <Link to="/Coachs" className="link">
          <li className="sidebarListItem">
            <PermIdentity className="sidebarIcon" />
            Coachs
          </li>
        </Link>
<Link to="/Events" className="link">
          <li className="sidebarListItem">
            <PermIdentity className="sidebarIcon" />
            Events
          </li>
        </Link>
        <Link to="/Bookings" className="link">
          <li className="sidebarListItem">
            <PermIdentity className="sidebarIcon" />
            Bookings
          </li>
        </Link>
        <Link to="/projects" className="link">
          <li className="sidebarListItem">
            <Storefront className="sidebarIcon" />
            Projects
          </li>
        </Link>
        <Link to="/Eveements" className="link">
        <li className="sidebarListItem">
          <EventIcon className="sidebarIcon" />
          Evenements
        </li>
        </Link>
        <Link to="/Articles" className="link">
        <li className="sidebarListItem">
          <ArticleIcon className="sidebarIcon" />
          Articles
        </li>
        </Link>
        

      </ul>
    </div>
    <div className="sidebarMenu">
      <h3 className="sidebarTitle">Notifications</h3>
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <MailOutline className="sidebarIcon" />
          Mail
        </li>
        <li className="sidebarListItem">
          <DynamicFeed className="sidebarIcon" />
          Feedback
        </li>
        <li className="sidebarListItem">
          <ChatBubbleOutline className="sidebarIcon" />
          Messages
        </li>
      </ul>
    </div>
    <div className="sidebarMenu">
      <h3 className="sidebarTitle">Staff</h3>
      <ul className="sidebarList">
        
      <Link to="/Investment" className="link">
        <li className="sidebarListItem">
          <WorkOutline className="sidebarIcon" />
          Investement
        </li>
        </Link>
        <li className="sidebarListItem">
          <Timeline className="sidebarIcon" />
          Analytics
        </li>
        <li className="sidebarListItem">
          <Report className="sidebarIcon" />
          Reports
        </li>
        <Link to="/" className="link">

<li className="sidebarListItem">
  <ExitToApp className="sidebarIcon" />
  Logout
</li>
</Link>
      </ul>
    </div>
  </div>
</div>
  
    );
}
