import React, { useState, useEffect } from "react";
import { useUserAuth } from "../Contexts/AuthContext";
const SetTimer = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [amPm, setAmPm] = useState("AM");
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  // const [alarms, setAlarms] = useState([]);
  const [newTime, setNewTime] = useState({});
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");

  const { setMotorStatus,alarms,setAlarms } = useUserAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log(alarms);
    if (alarms.length > 0) {
      const interval = setInterval(() => {
        const now = new Date();
        const currentAlarm = alarms.find((alarm) => {
          let [hours, minutes] = alarm.time.split(":");
          setNewTime({
            time: alarm.hours + ":" + alarm.minutes,
            hours: alarm.hours,
            minutes: alarm.minutes,
            duration: alarm.duration,
          });
          return (
            convertTo12HourFormat(now.getHours()) === parseInt(hours) &&
            now.getMinutes() === parseInt(minutes)
          );
        });
        if (currentAlarm || playing === true) {
          setMotorStatus("ON");
          console.log("Alarm is on");
          setPlaying(true);
          setMessage("Your Timer is Started");
        }

        let newMinutes = parseInt(newTime.minutes) + parseInt(newTime.duration);
        let newHours = parseInt(newTime.hours);
        if (newMinutes >= 60) {
          newHours += Math.floor(newMinutes / 60);
          newMinutes %= 60;
        }
        newHours %= 12;
        if (newHours === 0) {
          newHours = 12;
        }

        if (
          convertTo12HourFormat(now.getHours()) === parseInt(newHours) &&
          now.getMinutes() === parseInt(newMinutes)
        ) {
          setMotorStatus("OFF");
          console.log("Alarm is off");
          setPlaying(false);
          setMessage("Your Timer is OFF");
          setAlarms(
            alarms.filter((alarm) => {
              return alarm.time !== newTime.time;
            })
          );
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [alarms, duration, setMotorStatus, playing]);

  const handleSetTimer = () => {
    const newAlarm = {
      hours,
      minutes,
      amPm,
      duration,
      time: hours + ":" + minutes,
    };

    setAlarms([...alarms, newAlarm]);
  };

  const convertTo12HourFormat = (hours) => {
    if (hours === 0) {
      return 12;
    } else if (hours > 12) {
      return hours - 12;
    } else {
      console.log(hours);
      return hours;
    }
  };

  const handleRemoveAlarm = (index) => {
    setAlarms(alarms.filter((alarm, i) => i !== index));
    setMotorStatus("OFF");
    console.log("Alarm is off");
    setPlaying(false);
    setMessage("Your Timer is OFF");
  };

  return (
    <div className="h-screen ">
      <h1 className="my-4 text-3xl font-medium text-center text-teal-500">
        Set Timer
      </h1>

      <div className="flex flex-col items-center justify-center my-4 rounded-md shadow-md bg-slate-200/50">
        <h1 className="my-6 text-2xl font-medium text-teal-500">
          {currentTime}
        </h1>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 my-4">
            <select
              onChange={(e) => setHours(e.target.value)}
              className="h-10 overflow-y-scroll text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="Hours" selected disabled hidden>
                Hours
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setMinutes(e.target.value)}
              className="h-10 text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="Minutes" selected disabled hidden>
                Minutes
              </option>
              {[...Array(60)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setAmPm(e.target.value)}
              className="h-10 text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="AM/PM" selected disabled hidden>
                AM/PM
              </option>
              <option>AM</option>
              <option>PM</option>
            </select>
            <select
              onChange={(e) => setDuration(e.target.value)}
              className="h-10 text-xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
            >
              <option value="Limit" selected disabled hidden>
                Limits
              </option>
              {[...Array(60)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {message && (
            <div className="text-2xl font-medium text-center text-teal-400">
              {message}
            </div>
          )}

          <button
            onClick={handleSetTimer}
            className="flex items-center justify-center h-12 mx-10 my-4 text-2xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
          >
            Add Timer
          </button>
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full p-4 my-4 rounded-md shadow-md bg-slate-50"
            >
              <div className="flex items-center justify-center w-1/2">
                <h2 className="text-xl font-medium text-teal-500">
                  {alarm.time} {alarm.amPm}
                </h2>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <h2 className="text-xl font-medium text-teal-500">
                  {alarm.duration} Min
                </h2>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <button
                  onClick={() => handleRemoveAlarm(index)}
                  className="flex items-center justify-center px-2 py-1 mx-2 text-base bg-teal-500 rounded-md cursor-pointer text-slate-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetTimer;
