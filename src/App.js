import AllUsers from "./Views/AllUsers";
import User from "./Views/User";
import "./style/App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/user/:userName" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
