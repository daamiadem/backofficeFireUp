import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";

const Booking = (props) => (
  <tr>
    <td>{props.Booking.Name_Event}</td>
    <td>{props.Booking.idTicket}</td>
    <td>{props.Booking.Participant_Name}</td>
    <td>{props.Booking.Price}</td>
    <td>{props.Booking.Date_Debut}</td>
    <td>{props.Booking.Date_Fin}</td>
    <td>{props.Booking.Localisation}</td>
    <td>{props.Booking.img}</td>
    <td>{props.Booking.seat}</td>

    <td>
      <DeleteOutline
        href="#"
        onClick={() => {
          props.deleteBooking(props.Booking._id);
        }}
      >
        delete
      </DeleteOutline>
    </td>
  </tr>
);

export default class BookingsList extends Component {
  constructor(props) {
    super(props);

    this.deleteBooking = this.deleteBooking.bind(this);

    this.state = { Bookings: [] };
  }

  componentDidMount() {
    axios
      .get("https://spacedevfireupbackend.herokuapp.com/api/Bookings")
      .then((response) => {
        this.setState({ Bookings: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBooking(id) {
    axios
      .delete("https://spacedevfireupbackend.herokuapp.com/api/Bookings/deleteBooking/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      Bookings: this.state.Bookings.filter((el) => el._id !== id),
    });
  }

  BookingsList() {
    return this.state.Bookings.map((currentBooking) => {
      return (
        <Booking
          Booking={currentBooking}
          deleteBooking={this.deleteBooking}
          key={currentBooking._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>List of Bookings</h3>
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          style={{ marginTop: 50, marginBottom: 20, width: "40%" }}
        />
        <table className="table" pagination={true}>
          <thead className="thead-light">
            <tr>
              <th>Name_Event</th>
              <th>idTicket</th>
              <th>Participant_Name</th>
              <th>Price</th>
              <th>Date_Debut</th>
              <th>Date_Fin</th>
              <th>Localisation</th>

              <th>img</th>
              <th>seat</th>
            </tr>
          </thead>
          <tbody>{this.BookingsList()}</tbody>
        </table>
      </div>
    );
  }
}