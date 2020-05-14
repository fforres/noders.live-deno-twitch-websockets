// @ts-nocheck
// @ts-ignore
import React from "react";
import Panel from "./Panel";
import { hot } from "react-hot-loader/root";

const options = {
  ANGULAR: {
    name: "ANGULAR",
    votes: 0,
  },
  EMBER: {
    name: "EMBER",
    votes: 0,
  },
  VUE: {
    name: "VUE",
    votes: 0,
  },
  REACT: {
    name: "REACT",
    votes: 0,
  },
  SVELTE: {
    name: "SVELTE",
    votes: 0,
  },
};

const SOCKET_URL = "ws://localhost:4001";
function App() {
  const [, setConnection] = React.useState(null);
  const [votes, setVotes] = React.useState(options);
  const [hi, setHi] = React.useState("");
  React.useEffect(() => {
    const connection = new WebSocket(SOCKET_URL);
    setConnection(connection);
    connection.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.command === "!TEST") {
        console.log(`TestMessage: ${message}`);
      }
      if (message.command === "!VOTE") {
        if (options[message.message]) {
          setVotes((votes) => {
            return {
              ...votes,
              [message.message]: {
                ...votes[message.message],
                votes: votes[message.message].votes + 1,
              },
            };
          });
        }
      }
    };

    return () => {};
  }, []);
  return <Panel votes={votes} />;
}

export default hot(App);
