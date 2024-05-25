import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllRoutes from "./components/AllRoutes";
import AuthContext from "./components/AuthContext";
import useLocalStorage from "./components/hooks";

function App() {
  const [user, setUser] = useState({ username: "", token: "" });
  const [localUser, setLocalUser] = useLocalStorage("localUser", null);

  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider
          value={{ user, setUser, localUser, setLocalUser }}
        >
          <NavBar />
          <AllRoutes />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
