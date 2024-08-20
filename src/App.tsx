import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Wordle from "./components/Wordle";

export const wordle_end_point = "https://44.218.136.154/wordle/api";
const invalid_user_id = "invalid_user_id";

function App(): JSX.Element {
  const [user_id, setUserId] = useState<string>(invalid_user_id);

  useEffect(() => {
    console.log(wordle_end_point);
    void fetch(wordle_end_point, {
      method: "GET",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setUserId(res.userid);
        console.log("userid response was:", res.userid);
      })
      .catch((err) => {
        setUserId(invalid_user_id);
        console.error("failed to get user id");
        console.error(err);
      });
  }, [setUserId]);

  return (
    <div className="App">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </Helmet>
      <header>
        <div className="left">
          <a id="icons" href="https://www.dimitrifrazao.com">
            <i className="material-symbols-outlined">home</i>
          </a>
        </div>
        <h1 className="title">Wordle</h1>
        <div className="right">
          <span
            id="icons"
            className="material-symbols-outlined"
            style={{ cursor: "pointer" }}
          >
            help
          </span>
          <span
            id="icons"
            className="material-symbols-outlined"
            style={{ cursor: "pointer" }}
          >
            bar_chart
          </span>
          <span
            id="icons"
            className="material-symbols-outlined"
            style={{ cursor: "pointer" }}
          >
            settings
          </span>
        </div>
      </header>
      {Wordle(user_id)}
    </div>
  );
}

export default App;
