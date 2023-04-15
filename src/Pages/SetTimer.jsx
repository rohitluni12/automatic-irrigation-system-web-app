import React, { useEffect } from "react";

const SetTimer = () => {
  function SetTimer(duration) {
    const durationInMilliseconds = duration * 60 * 1000;
    setTimeout(() => {
      console.log("Timer is On");
    }, durationInMilliseconds);
  }

  // Check if current time matches the specified time and set timer if true
  function CheckAndSetTimer(hours, minutes, amPm, duration) {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentAmPm = currentHours >= 12 ? "PM" : "AM";

    if (
      hours === currentHours &&
      minutes === currentMinutes &&
      amPm === currentAmPm
    ) {
      SetTimer(duration);
    }
  }

  // Call the CheckAndSetTimer function with the desired arguments
  CheckAndSetTimer(12, 41, "AM", 1);

  return <div>SetTimer</div>;
};

export default SetTimer;
