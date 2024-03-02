import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

declare global {
  interface Window {
    REACT_APP_API_URL: unknown;
  }
}

const api_url = window.REACT_APP_API_URL || {};

function App(): JSX.Element {
  const [user_id, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const address: string = "http://" + api_url + "/wordle";
    console.log(address);
    void fetch(address, {
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
        setUserId("invalid_user_id");
        console.error("failed to get user id");
        console.error(err);
      });
  }, [setUserId]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {user_id && <Wordle user_id={user_id} />}
    </div>
  );
}

export default App;
