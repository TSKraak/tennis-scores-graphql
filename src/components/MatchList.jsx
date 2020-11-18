import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import ErrorIcon from "@material-ui/icons/Error";
import moment from "moment";
import { GET_ALL_MATCHES } from "../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
}));

function MatchList() {
  const classes = useStyles();
  // const { loading, error, data } = useQuery(GET_ALL_MATCHES);
  const { data, error, loading } = useSubscription(GET_ALL_MATCHES);

  if (loading) return "Loading...";
  if (error)
    return (
      <p>
        <ErrorIcon fontSize="large" />
        Error! ${error.message}
      </p>
    );

  const finishedMatches = data.matches.filter((match) => match.finished);
  const ongoingMatches = data.matches.filter((match) => !match.finished);
  // console.log("finished:", finishedMatches);
  // console.log("ongoing:", ongoingMatches);

  return (
    <Container className={classes.root}>
      <Typography variant="h2">Ongoing Matches</Typography>
      <Box>
        {ongoingMatches.map((match) => (
          <article key={match.id}>
            <p>Match ID: {match.id}</p>
            <p>
              Match date:{" "}
              {moment(match.started_at).format("DD-MM-YYYY hh:mm:ss")}
            </p>
            <p>
              {match.p1.name} vs {match.p2.name}
            </p>

            <ul>
              <b>Sets:</b>

              {match.setts.map((set, i) => (
                <li key={i}>
                  {set.p1_score} - {set.p2_score}
                </li>
              ))}
            </ul>

            {match.winner ? (
              <p>
                <b>Winner: {match.winner.name}</b>
              </p>
            ) : null}
            <p>Status: {match.finished ? "Match finished" : "Ongoing"}</p>
            <hr />
          </article>
        ))}
      </Box>
      <br></br>
      <br></br>
      <Typography variant="h2">Finished Matches</Typography>
      <Box>
        {finishedMatches.map((match) => (
          <article key={match.id}>
            <p>Match ID: {match.id}</p>
            <p>Match date: {match.started_at}</p>
            <p>
              {match.p1.name} vs {match.p2.name}
            </p>

            <ul>
              <b>Sets:</b>

              {match.setts.map((set, i) => (
                <li key={i}>
                  {set.p1_score} - {set.p2_score}
                </li>
              ))}
            </ul>

            {match.winner ? (
              <p>
                <b>Winner: {match.winner.name}</b>
              </p>
            ) : null}
            <p>Status: {match.finished ? "Match finished" : "Ongoing"}</p>
            <hr />
          </article>
        ))}
      </Box>
    </Container>
  );
}

export default MatchList;
