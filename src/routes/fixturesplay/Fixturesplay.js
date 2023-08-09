import React, { useState, useEffect } from "react";
import * as ServerApi from "utils/serverApi";
import * as dateHelpers from "utils/dateHelpers";
import DateChooser from "components/DateChooser/DateChooser";
import LeaguesChooser from "components/LeaguesChooser/LeaguesChooser";
import { useSelector } from "react-redux";
import "./fixturesplay.scss";

const Fixturesplay = (props) => {
  const [fixtures, setFixtures] = useState([]);
  const dateGlobalState = useSelector((state) => state.fixtures.value.date);
  const selectedLeaguesGlobalState = useSelector(
    (state) => state.fixtures.value.country_leagues
  );
  var selectedDate = dateGlobalState.date;

  useEffect(() => {
    ServerApi.allfixtures()
      .then((res) => {
        setFixtures(res.data);
      })
      .catch((err) => {
        console.log("Server ERROR");
      });
  }, []);

  var filteredFixtures = fixtures.filter((fixture) => {
    return (
      fixture.date === selectedDate &&
      selectedLeaguesGlobalState.includes(fixture.league.country)
    );
  });

  return (
    <div className="fixturesplay-page">
      <DateChooser></DateChooser>
      <LeaguesChooser></LeaguesChooser>
      <div className="fixtures-table">
        <div className="fixtures">
          {filteredFixtures.map((fixture) => {
            const dateAndHour = dateHelpers.convertTimestamp(fixture.timestamp);
            return (
              <div key={fixture.api_fixture_id} className="fixture-border">
                <div className="fixture">
                  <div className="club">
                    <img
                      className="club-crest"
                      src={fixture.clubs.home.logo}
                      alt={fixture.clubs.home.name}
                    ></img>
                    <h3 className="club-name">{fixture.clubs.home.name}</h3>
                  </div>
                  <div className="fixture-info">
                    {fixture.score.winner ? (
                      <p>{`${fixture.score.home} - ${fixture.score.away}`}</p>
                    ) : (
                      <div className="date-hour">
                        <p>{dateAndHour.formattedDate}</p>
                        <p>{dateAndHour.formattedHour}</p>
                      </div>
                    )}
                  </div>
                  <div className="club">
                    <img
                      className="club-crest"
                      src={fixture.clubs.away.logo}
                      alt={fixture.clubs.away.name}
                    ></img>
                    <h3 className="club-name">{fixture.clubs.away.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fixturesplay;
