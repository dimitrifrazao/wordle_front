import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

export const wordle_end_point = "https://44.218.136.154:5000/wordle";
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
      <h1>Wordle</h1>
      {Wordle(user_id)}
    </div>
  );
}

export default App;
