import React, { useRef, useState, useEffect } from "react";
import DatePicker from "tui-date-picker";

import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const TuiDateRangePicker = (props) => {
  const { start, end, style, onChange } = props;
  const [rangePicker, setRangePicker] = useState();
  const startPickerContainerRef = useRef(null);
  const startPickerInputRef = useRef(null);
  const endPickerContainerRef = useRef(null);
  const endPickerInputRef = useRef(null);

  useEffect(() => {
    if (rangePicker === undefined) {
      setRangePicker(
        DatePicker.createRangePicker({
          ...props,
          startpicker: {
            date: start || new Date(),
            input: startPickerInputRef.current || "#startpicker-input",
            container:
              startPickerContainerRef.current || "#startpicker-container"
          },
          endpicker: {
            date: end || new Date(),
            input: endPickerInputRef.current || "#endpicker-input",
            container: endPickerContainerRef.current || "#endpicker-container"
          }
        })
      );
    } else {
      rangePicker.on("change:start", () => {
        console.log(`Start date: ${rangePicker.getStartDate()}`);
        return typeof onChange === "function"
          ? onChange([rangePicker.getStartDate(), rangePicker.getEndDate()])
          : undefined;
      });
      rangePicker.on("change:end", () => {
        console.log(`End date: ${rangePicker.getStartDate()}`);
        return typeof onChange === "function"
          ? onChange([rangePicker.getStartDate(), rangePicker.getEndDate()])
          : undefined;
      });
    }

    return () => {
      if (rangePicker !== undefined) {
        rangePicker.destroy();
      }
    };
  }, [rangePicker]);

  return (
    <div style={style}>
      <div className="tui-full-calendar-popup-section">
        <div
          style={{ width: 224.5 }}
          className="tui-full-calendar-popup-section-item tui-full-calendar-section-start-date"
        >
          <span className="tui-full-calendar-icon tui-full-calendar-ic-date" />
          <input
            className="tui-full-calendar-content"
            placeholder="Start date"
            id="startpicker-input"
            ref={startPickerInputRef}
          />
          <div id="startpicker-container" ref={startPickerContainerRef} />
        </div>
        <span className="tui-full-calendar-section-date-dash">-</span>
        <div
          style={{ width: 224.5 }}
          className="tui-full-calendar-popup-section-item tui-full-calendar-section-end-date"
        >
          <span className="tui-full-calendar-icon tui-full-calendar-ic-date" />
          <input
            className="tui-full-calendar-content"
            placeholder="End date"
            id="endpicker-input"
            ref={endPickerInputRef}
          />
          <div id="endpicker-container" ref={endPickerContainerRef} />
        </div>
      </div>
    </div>
  );
};

export default TuiDateRangePicker;
