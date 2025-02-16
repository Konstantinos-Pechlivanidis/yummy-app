import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateTimePicker.css";

const DateTimePicker = ({ availability, isOwner }) => {
  const { openTime, closeTime, blockedSlots, existingReservations } = availability;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");
  const [blockedTimes, setBlockedTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      generateAvailableTimes();
    }
  }, [selectedDate, blockedSlots, existingReservations]);

  useEffect(() => {
    setDefaultTime();
  }, [availableTimes]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateAvailableTimes = () => {
    const times = [];
    const [openHour] = openTime.split(":").map(Number);
    const [closeHour] = closeTime.split(":").map(Number);

    for (let hour = openHour; hour < closeHour; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }

    const formattedDate = formatDate(selectedDate);

    // Get booked times
    const bookedTimes = existingReservations
      .filter((res) => res.date === formattedDate)
      .map((res) => res.time);

    // Get blocked times
    const blockedTimesForDate =
      blockedSlots.find((slot) => slot.date === formattedDate)?.times || [];

    // Filter out booked & blocked times
    const filteredTimes = times.filter(
      (time) => !bookedTimes.includes(time) && !blockedTimesForDate.includes(time)
    );

    setAvailableTimes(filteredTimes);
  };

  const setDefaultTime = () => {
    if (availableTimes.length > 0) {
      const now = new Date();
      now.setMinutes(0);
      now.setSeconds(0);

      let nextHour = now.getHours() + 1;
      const closingHour = parseInt(closeTime.split(":")[0], 10);

      if (nextHour >= closingHour) {
        nextHour = closingHour - 1; // Last available hour
      }

      const formattedNextHour = `${nextHour}:00`;

      if (availableTimes.includes(formattedNextHour)) {
        setSelectedTime(formattedNextHour);
      } else {
        setSelectedTime(availableTimes[0] || null);
      }
    }
  };

  return (
    <div className="datetime-picker-container">
      <h2 className="datetime-title">Choose Your Reservation</h2>

      <div className="calendar-section">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      {selectedDate && (
        <div className="time-section">
          <h3>Available Time Slots</h3>
          <div className="time-slots">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <button
                  key={time}
                  className={`time-slot-button ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))
            ) : (
              <p className="no-slots">No available slots</p>
            )}
          </div>

          <div className="restaurant-hours">
            <p>
              <strong>Restaurant Hours:</strong> {openTime} - {closeTime}
            </p>
          </div>

          {selectedTime && (
            <div className="reservation-summary">
              <h3>Reservation Summary</h3>
              <p>
                <strong>Date:</strong> {selectedDate.toDateString()} <br />
                <strong>Time:</strong> {selectedTime}
              </p>
              <textarea
                className="special-request-input"
                placeholder="Any special request?"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              ></textarea>
              <button className="confirm-reservation-button">
                Confirm Reservation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
