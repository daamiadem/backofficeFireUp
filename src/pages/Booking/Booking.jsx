import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";

const Event = (props) => (
  <tr>
    <td>{props.Event.Title}</td>
    <td>{props.Event.Organisator}</td>
    <td>{props.Event.Categories}</td>
    {/* <td>{props.Event.sexe}</td> */}
    <td>{props.Event.Description}</td>
    {/* <td>{props.Event.Price}</td> */}
    <td>{props.Event.Nbentrepreneurs}</td>
    <td>{props.Event.NbInvestisseurs}</td>
    <td>{props.Event.Capacite}</td>
    <td>{props.Event.Date_Debut}</td>
    <td>{props.Event.Date_Fin}</td>
    <td>{props.Event.Localisation}</td>
    <td>{props.Event.img}</td>

    <td>
      <Link to={"/updateEvent/" + props.Event._id}>
        <button
          style={{
            Width: "200px",
            background: "teal",
            borderRadius: "5px",
            border: "none",
            padding: "5px",
            color: "white",
            fontsize: "16px",
          }}
        >
          Edit
        </button>
      </Link>
    </td>
    <td>
      <DeleteOutline
        href="#"
        onClick={() => {
          props.deleteEvent(props.Event._id);
        }}
      >
        delete
      </DeleteOutline>

      {/* <td>
      <Link to="/newEvent">
        <button className="">Create</button>
      </Link>
    </td> */}
    </td>
  </tr>
);

export default class EventsList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this);

    this.state = { Events: [] };
  }

  componentDidMount() {
    axios
      .get("https://spacedevfireupbackend.herokuapp.com/api/Events")
      .then((response) => {
        this.setState({ Events: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteEvent(id) {
    axios
      .delete("https://spacedevfireupbackend.herokuapp.com/api/Events/deleteEvent/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      Events: this.state.Events.filter((el) => el._id !== id),
    });
  }

  EventsList() {
    return this.state.Events.map((currentEvent) => {
      return (
        <Event
          Event={currentEvent}
          deleteEvent={this.deleteEvent}
          key={currentEvent._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Link to="/newEvent">
          <button
            style={{
              Width: "200px",
              background: "teal",
              borderRadius: "5px",
              border: "none",
              padding: "5px",
              color: "white",
              fontsize: "20px",
            }}
          >
            Create New Event
          </button>
        </Link>

        <h3>List of Events</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Organisator</th>
              <th>Categories</th>
              {/* <th>Sexe</th> */}
              <th>Description</th>
              {/* <th>Price</th> */}
              <th>Nbentrepreneurs</th>
              <th>NbInvestisseurs</th>
              <th>Capacite</th>
              <th>Date_Debut</th>
              <th>Date_Fin</th>
              <th>Localisation</th>
              <th>img</th>
            </tr>
          </thead>
          <tbody>{this.EventsList()}</tbody>
        </table>
      </div>
    );
  }
}