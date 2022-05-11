import React, { useState, useEffect, useRef } from 'react';
import "./topbar.css";
import { ReactComponent as MessengerIcon } from '../../images/messenger.svg';
import { ReactComponent as CaretIcon } from '../../images/caret.svg';
import { ReactComponent as PlusIcon } from '../../images/plus.svg';
import { ReactComponent as CogIcon } from '../../images/cog.svg';
import { ReactComponent as ChevronIcon } from '../../images/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as BoltIcon } from '../../images/bolt.svg';
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { ReactComponent as BellIcon } from '../../images/bell.svg';
import { selecttickets } from "../../redux/slices/ticketsSlice";

import { Link } from "react-router-dom";
import jwt from 'jsonwebtoken'
import { queryApi } from "../../utils/queryApi";

import { CSSTransition } from 'react-transition-group';
import { useSelector } from "react-redux";

export default function Topbar(props) {
  const [formData2, setFormData2] = useState({
    checked:"Seen",
  });


  const [ticketlist] = useSelector(selecttickets);
  const [ticket, setTicket] = useState(ticketlist);

  const [testhere, settesthere] = useState(0);
console.log(ticketlist)
console.log("aaa")
console.log(ticketlist.length)
console.log(ticket)
  useEffect(() => {
    let ticket = ticketlist.filter((ticket) => ticket.checked === "Unseen");

    setTicket(ticket)
    // ticketlist.forEach(element => {console.log(element)
    //   if (element.checked=="Unseen")
    //   settesthere(testhere+1)
    //   console.log("yes")
    // });
  }, [])

  const testishere = async() =>
 {
   console.log("camehere")
  
   ticket.forEach(async element => {console.log(element)
      if (element.checked=="Unseen")
      {
        const [, err2] =   await queryApi("offerticket/edit/"+element._id, formData2, "POST", false);
        if (err2) {
          console.log(err2)
        
        } 
      }
 window.location.href="/OfferticketList/"+props.id
    });

}



function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);


  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menuuu">
          <DropdownItem
            leftIcon={<BellIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="Notifications">
            Reservations
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Live reservations
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'Notifications'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menuuu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h5>You have {ticket.length} tickets not seen</h5>
          </DropdownItem>
          {ticket.map((ticket) => (

          <DropdownItem leftIcon={<BoltIcon />}>ticket at {ticket.timeoffer} for {ticket.dateoffer}</DropdownItem>
          ))}

          <Link onClick={testishere} >Mark as seen and go to tickets</Link>


          {/* <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem> */}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menuuu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Live reservations</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
  console.log(props)
  // const [user,setuser]=useState('')
  function NavItem(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>
  
        {open && props.children}
      </li>
    );
  }
  console.log(jwt.decode(localStorage.getItem('token')))
  if (jwt.decode(localStorage.getItem('token'))!==null)
   console.log (jwt.decode(localStorage.getItem('token')).testjwt)

  //  console.log(user)
// if (user==="coach"){
  return (
    (jwt.decode(localStorage.getItem('token'))!==null) &&
    (jwt.decode(localStorage.getItem('token')).testjwt==="coach")?(
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">coach</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
          <NavItem icon={<NotificationsNone />} >
          <DropdownMenu></DropdownMenu>
          </NavItem>

            <span className="topIconBadge">{ticket.length}</span>
          </div>
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <Link to={"/settings/"+props.id} className="link">

          <div className="topbarIconContainer">
            <Settings />
          </div>

          </Link>
          <h3>{props.nom}</h3>
          
          <img src={`${process.env.REACT_APP_API_URL_UPLOADS + '/' + props.imagee}`}                    alt=""
  className="topAvatar" />
        </div>
      </div>
    </div>
  ):<div className="topbar">
  <div className="topbarWrapper">
    <div className="topLeft">
      <span className="logo">Admin</span>
    </div>
    <div className="topRight">
      <div className="topbarIconContainer">
        <NotificationsNone />
        <span className="topIconBadge">2</span>
      </div>
      <div className="topbarIconContainer">
        <Language />
        <span className="topIconBadge">2</span>
      </div>
      <div className="topbarIconContainer">
        <Settings />
      </div>
      <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
    </div>
  </div>
</div>
  
  );
 

}
