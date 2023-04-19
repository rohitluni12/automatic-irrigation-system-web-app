// import React, { useState, useEffect } from "react";
// // import alarmSound from "";

// const SetTimer = () => {
//   const [alarms, setAlarms] = useState([]);
//   const [newAlarm, setNewAlarm] = useState("");
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
//   const [playing, setPlaying] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   useEffect(() => {
//     if (alarms.length > 0) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const currentAlarm = alarms.find((alarm) => {
//           const [hours, minutes] = alarm.split(":");
//           return now.getHours() === parseInt(hours) && now.getMinutes() === parseInt(minutes);
//         });
//         if (currentAlarm) {
//           setPlaying(true);
//           // const audio = new Audio(alarmSound);
//           // audio.play();
//           console.log("on")
//           setTimeout(() => {
//             setPlaying(false);
//           }, 5000);
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [alarms]);

//   const addAlarm = () => {
//     if (newAlarm) {
//       setAlarms([...alarms, newAlarm]);
//       setNewAlarm("");
//     }
//   };

//   const deleteAlarm = (index) => {
//     const newAlarms = [...alarms];
//     newAlarms.splice(index, 1);
//     setAlarms(newAlarms);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       addAlarm();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="mb-6 text-3xl font-bold">Multiple Alarm Clock</h1>
//       <div className="flex flex-col items-center justify-center mb-8 w-80">
//         {alarms.map((alarm, index) => (
//           <div key={index} className="flex items-center justify-between w-full px-4 py-2 mb-2 bg-gray-200 rounded-md">
//             <div className="text-lg font-medium">{alarm}</div>
//             <button className="font-medium text-red-500" onClick={() => deleteAlarm(index)}>
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center justify-center">
//         <input
//           type="text"
//           placeholder="Enter new alarm time (HH:MM)"
//           className="px-4 py-2 mr-4 border border-gray-400 rounded-md w-80"
//           value={newAlarm}
//           onChange={(event) => setNewAlarm(event.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md" onClick={addAlarm}>
//           Add Alarm
//         </button>
//       </div>
//       <div className="mt-8 text-4xl font-bold">{currentTime}</div>
//       {playing && <div className="mt-4 text-xl font-medium text-red-500">Alarm Playing...</div>}
//     </div>
//   );
// };

// export default SetTimer;

import React, { useState, useEffect } from "react";

const SetTimer = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [amPm, setAmPm] = useState("AM");
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [alarms, setAlarms] = useState([]);
  const [activeAlarm, setActiveAlarm] = useState(-1);
  const [playing, setPlaying] = useState(false);

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
          const [hours, minutes] = alarm.time.split(":");
          return (
            now.getHours() === parseInt(hours) &&
            now.getMinutes() === parseInt(minutes)
          );
        });
        // the alarm is on until the duration is over
        if (currentAlarm && duration > 0) {
          // we have to decreasing the duration by 1 every second until it reaches 0
          setDuration(duration - 1);

          setPlaying(true);
          console.log("on");
          setTimeout(() => {
            setPlaying(false);
          }, 5000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    setPlaying(false);
    console.log("off");
    setActiveAlarm(-1);
  }, [alarms]);

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

  const handleRemoveAlarm = (index) => {
    setAlarms(alarms.filter((alarm, i) => i !== index));
  };

  return (
    <div className="h-screen ">
      <h1 className="my-10 text-3xl font-medium text-center text-teal-500">
        Set Timer
      </h1>
      <div className="flex flex-col items-center justify-center my-4 rounded-md bg-slate-300">
        <h1 className="my-8 text-2xl font-medium text-teal-500">
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

          <button
            onClick={handleSetTimer}
            className="flex items-center justify-center h-12 mx-10 my-4 text-2xl bg-teal-400 rounded-md cursor-pointer text-slate-50"
          >
            Set Timer
          </button>
          {alarms.map((alarm, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full my-4"
            >
              <div className="flex items-center justify-center w-1/2">
                <h2 className="text-xl font-medium text-teal-500">
                  {alarm.time} {alarm.amPm}
                </h2>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <h2 className="text-xl font-medium text-teal-500">
                  {alarm.duration} min
                </h2>
              </div>
              <div className="flex items-center justify-center w-1/4">
                <button
                  onClick={() => handleRemoveAlarm(index)}
                  className="flex items-center justify-center px-2 py-1 mx-2 text-base bg-red-500 rounded-md cursor-pointer text-slate-50"
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
