import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./addEvent.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Create Event</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Create</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Event Title</label>
                <input type="text" className="userUpdateInput" />
              </div>

              <div className="userUpdateItem">
                <label>Organisator</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Categories</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Sexe</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Price</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Nbentrepreneurs</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>NbInvestisseurs</label>
                <input type="text" className="userUpdateInput" />
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
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Date_fin</label>
                <input type="text" className="userUpdateInput" />
              </div>
              <div className="userUpdateItem">
                <label>Localisation</label>
                <input type="text" className="userUpdateInput" />
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
              <button className="userUpdateButton">add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
