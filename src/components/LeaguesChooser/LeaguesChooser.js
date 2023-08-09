import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enableLeague, disableLeague } from "../../features/fixturesSlice";
import "./leagueschooser.scss";
import England from "flags/england.png";
import France from "flags/france.png";
import Germany from "flags/germany.png";
import Italy from "flags/italy.png";
import Spain from "flags/spain.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const checkboxData = [
  {
    id: 1,
    name: "England",
    league: "Premier League",
    backgroundImage: `url(${England})`,
  },
  {
    id: 2,
    name: "Spain",
    league: "La Liga",
    backgroundImage: `url(${Spain})`,
  },
  {
    id: 3,
    name: "Italy",
    league: "Serie A",
    backgroundImage: `url(${Italy})`,
  },
  {
    id: 4,
    name: "France",
    league: "Ligue 1",
    backgroundImage: `url(${France})`,
  },
  {
    id: 5,
    name: "Germany",
    league: "Bundesliga",
    backgroundImage: `url(${Germany})`,
  },
];

export default function LeaguesChooser(props) {
  const dispatch = useDispatch();
  const selectedLeaguesGlobalState = useSelector(
    (state) => state.fixtures.value.country_leagues
  );

  useEffect(() => {
    checkboxData.forEach((league) => {
      if (!selectedLeaguesGlobalState.includes(league.name)) {
        // here we know the global selected leagues array doesn't contain the league.
        const leagueElement = document.querySelector(`[league=${league.name}]`);
        leagueElement.classList.remove("chosen");
        leagueElement.classList.add("not-chosen");
        leagueElement.classList.add("hidden-check");
      }
    });
  });

  const handleClick = (event) => {
    var clickedDiv = event.target;
    const target_league = clickedDiv.getAttribute("league");

    if (clickedDiv.classList.contains("chosen")) {
      dispatch(disableLeague({ target_league }));
      clickedDiv.classList.add("not-chosen");
      clickedDiv.classList.remove("chosen");
      clickedDiv.classList.add("hidden-check");
    } else {
      dispatch(enableLeague({ target_league }));
      clickedDiv.classList.add("chosen");
      clickedDiv.classList.remove("not-chosen");
      clickedDiv.classList.remove("hidden-check");
    }
  };

  return (
    <div className="leagues-chooser-div">
      {checkboxData.map((checkbox, index) => {
        return (
          <div
            league={checkbox.name}
            style={{ backgroundImage: checkbox.backgroundImage }}
            className="league-flag chosen "
            onClick={handleClick}
          >
            <FontAwesomeIcon
              className="check-icon"
              icon={faCheck}
              style={{ color: "#ffffff" }}
            />
          </div>
        );
      })}
    </div>
  );
}
