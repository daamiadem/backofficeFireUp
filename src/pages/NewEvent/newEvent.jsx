import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./newEvent.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Event</h1>
        <Link to="/addEvent">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Event1</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Event Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Event1</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">06.04.2022</span>
            </div>
            <span className="userShowTitle">Event Details</span>

            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Manar1 | Tunis</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Event Title</label>
                <input
                  type="text"
                  placeholder="Event1"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Organisator</label>
                <input
                  type="text"
                  placeholder="Organisator"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Categories</label>
                <input
                  type="text"
                  placeholder="Categories"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Sexe</label>
                <input
                  type="text"
                  placeholder="H/F"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Price</label>
                <input
                  type="text"
                  placeholder="20$"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Nbentrepreneurs</label>
                <input
                  type="text"
                  placeholder="20"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>NbInvestisseurs</label>
                <input
                  type="text"
                  placeholder="30"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Capacite</label>
                <input
                  type="text"
                  placeholder="50"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Date_Debut</label>
                <input
                  type="text"
                  placeholder="06/04/2022"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Date_fin</label>
                <input
                  type="text"
                  placeholder="07/04/2022"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Localisation</label>
                <input
                  type="text"
                  placeholder="Manar1 Tunis"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
