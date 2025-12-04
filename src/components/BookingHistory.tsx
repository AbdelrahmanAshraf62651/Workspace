import { useState, useEffect } from "react";
import axios from "axios";
import type { Booking } from "../types";
import { useLocation } from "react-router-dom";

function BookingHistory() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [userBooking, setUserBooking] = useState<Booking[]>([]);
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    console.log(userID);
    axios
      .get("https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking")
      .then((response) => {
        setAllBookings(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isProfilePage]);
  useEffect(() => {
    const userID = localStorage.getItem("userId");
    const filteredBookings = allBookings.filter(
      (booking) => booking.user_id == userID
    );
    setUserBooking(filteredBookings);
  },[allBookings])
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "text-bg-warning";
      case "confirmed":
        return "text-bg-success";
      case "cancelled":
        return "text-bg-danger";
      default:
        return "text-bg-secondary";
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const formatTime = (end_time : string, start_time : string) => {
    const timeString = Number(end_time) - Number(start_time);
    return timeString / 3600000;
  }
  return (
    <>
      <h2 className="mt-5 fw-bold">Booking History</h2>
      <div className="p-4 shadow-sm booking-history">
        <div className="tab-content" id="booking-tabs-content">
          <div
            className="tab-pane fade show active"
            id="upcoming"
            role="tabpanel"
            aria-labelledby="upcoming-tab"
          >
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Room</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {userBooking.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.room_name}</td>
                      <td>{formatDate(booking.start_time)}</td>
                      <td>{formatTime(booking.end_time, booking.start_time)} Hour</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${getStatusBadgeClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>{booking.cost} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingHistory;
