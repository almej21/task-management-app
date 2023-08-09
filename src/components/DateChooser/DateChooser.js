import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./datechooser.scss";
import * as dateHelpers from "utils/dateHelpers";
import { useDispatch } from "react-redux";
import { setDate } from "features/fixturesSlice";

var dates = dateHelpers.getNextDaysArray(10);

export default function DateChooser() {
  const dispatch = useDispatch();

  const handleClick = (date) => {
    dispatch(setDate({ date: date }));
    setDate(date);
  };

  return (
    <div className="datechooser-main-div">
      <ButtonGroup aria-label="dates-group" className="dates-group">
        {dates.map((date) => {
          return (
            <Button
              key={date}
              onClick={() => handleClick(date)}
              className="date-btn btn-lg"
            >
              {date}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
