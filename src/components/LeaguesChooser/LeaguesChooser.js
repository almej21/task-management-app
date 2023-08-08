import React, { useState, useEffect } from "react";
import "./leagueschooser.scss";
import England from "flags/england.png";
import France from "flags/france.png";
import Germany from "flags/germany.png";
import Italy from "flags/italy.png";
import Spain from "flags/spain.png";

export default function LeaguesChooser(props) {
  const checkboxData = [
    {
      id: 1,
      name: "England",
      backgroundImage: `url(${England})`,
    },
    {
      id: 2,
      name: "Spain",
      backgroundImage: `url(${France})`,
    },
    {
      id: 3,
      name: "Italy",
      backgroundImage: `url(${Germany})`,
    },
    {
      id: 4,
      name: "France",
      backgroundImage: `url(${Italy})`,
    },
    {
      id: 5,
      name: "Germany",
      backgroundImage: `url(${Spain})`,
    },
  ];

  const handleClick = (event) => {
    var clickedDiv = event.target;
    if (clickedDiv.classList.contains("chosen")) {
      clickedDiv.classList.add("not-chosen");
      clickedDiv.classList.remove("chosen");
    } else {
      clickedDiv.classList.add("chosen");
      clickedDiv.classList.remove("not-chosen");
    }
  };

  return (
    <div className="leagues-chooser-div">
      {checkboxData.map((checkbox) => {
        return (
          <div
            key={checkbox.id}
            style={{ backgroundImage: checkbox.backgroundImage }}
            className="league-checkbox-div chosen"
            onClick={handleClick}
          ></div>
        );
      })}
    </div>
  );
}
