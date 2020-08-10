import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
const attendees = [
  {
    id: "1",
    name: "Chin"
  },
  { id: "2", name: "Khanh" },
  { id: "3", name: "Linh" }
];
const schedules = [
  {
    id: "1",
    title: "Mua nuoc dum",
    calendarId: "1",
    category: "time",
    attendees: ["Chin"],
    isVisible: true,
    start,
    end
  },
  {
    id: "2",
    title: "Di lau nha",
    calendarId: "2",
    category: "time",
    attendees: ["Khanh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  },
  {
    id: "3",
    title: "Di don phong",
    calendarId: "3",
    category: "time",
    attendees: ["Hai"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 4))
  },
  {
    id: "4",
    title: "Phai lam sao day",
    calendarId: "4",
    category: "time",
    attendees: ["Linh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 6))
  }
];

const calendars = [
  {
    id: "1",
    name: "BPA Technical",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F"
  },
  {
    id: "2",
    name: "Aqua 2 Cleaning",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A"
  },
  {
    id: "3",
    name: "Aqua 4 Cleaning",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  },
  {
    id: "4",
    name: "Luxury 6 Cleaning",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C"
  },
  {
    id: "5",
    name: "Luxury 6 Management",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D"
  },
  {
    id: "6",
    name: "Aqua 3 Management",
    color: "#ffffff",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40"
  },
  {
    id: "7",
    name: "Aqua 2 Management",
    color: "#000000",
    bgColor: "#FFFFFF",
    dragBgColor: "#FFFFFF",
    borderColor: "#FFFFFF"
  }
];

export default function App() {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();

  const toggle = () => setModal(!modal);

  function onBeforeCreateSchedule(event) {
    console.log("onBeforeCreateSchedule", event);
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
    console.log("get newEvent", newEvent);
    // call api
    const result = true;

    if (result) {
      const schedule = {
        ...event,
        id: String(Math.round(Math.random() * 1000, 2)),
        title: newEvent.title,
        calendarId: newEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: newEvent.attendees,
        isVisible: true,
        start: event.start,
        end: event.end,

        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: event.location,
        // raw: {
        //   class: event.raw["class"]
        // },
        state: event.state,
        body: event.body
      };

      childRef.current.createSchedule(schedule);
      setModal(false);
    }
  }

  function onBeforeUpdateSchedule(event) {
    console.log("onBeforeUpdateSchedule", event);
    setModal(true);
    setEvent(event);
  }

  function handleUpdateSchedule() {
    // call api
    const result = true;

    if (result) {
      const { schedule, changes } = event;
      childRef.current.updateSchedule(schedule, { ...changes, title: "123" });
    }
  }

  function onBeforeDeleteSchedule(event) {
    console.log("onBeforeDeleteSchedule", event);

    // call api
    const result = true;

    if (result) {
      const { schedule } = event;
      childRef.current.deleteSchedule(schedule);
    }

    return true;
  }

  return (
    <div>
      <CustomTuiCalendar
        ref={childRef}
        {...{
          isReadOnly: false,
          showSlidebar: true,
          showMenu: true,
          useCreationPopup: false,
          // onCreate: () => {
          //   console.log("create that!!!");
          //   childRef.current.getAlert();
          // },
          // createText: "Tao moi",
          calendars,
          schedules,
          onBeforeCreateSchedule,
          onBeforeUpdateSchedule,
          onBeforeDeleteSchedule
        }}
      />
      <CustomTuiModal
        {...{
          isOpen: modal,
          toggle,
          onSubmit:
            event?.triggerEventName === "mouseup"
              ? handleCreateSchedule
              : handleUpdateSchedule,
          submitText: event?.triggerEventName === "mouseup" ? "Save" : "Update",
          calendars,
          attendees
        }}
      />
    </div>
  );
}
