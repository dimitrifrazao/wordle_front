import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

const requestOptions: RequestInit = {
  method: "GET", // HTTP method (GET, POST, PUT, DELETE, etc.)
  credentials: "include",
  mode: "cors", // Include CORS headers
  headers: {
    "Content-Type": "application/json",
  },
};

function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout)
    ),
  ]);
}

function App(): JSX.Element {
  const [user_id, setUserId] = useState<string | null>(null);

  useEffect(() => {
    void fetchWithTimeout("http://127.0.0.1:5000/wordle", requestOptions, 5000)
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
