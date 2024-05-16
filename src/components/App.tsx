import { Route, Routes } from "react-router-dom";
import pulse from "../common/Pulse.gif";
import { setPreloader } from "../redux/preloader/selector";
import { useAppSelector } from "../redux/redux_hooks";
import "./App.css";
import styles from "./Container.module.scss";
import { Events } from "./events/Events";
import { Participants } from "./participants/Participants";
import { Register } from "./register/Register";

function App() {
  const preloader = useAppSelector(setPreloader);
  return (
    <div className={styles["container"]}>
      {preloader && <img src={pulse} width={"150px"} alt="Loading..."></img>}
      <Routes>
        <Route path="/" element={<Events />}></Route>
        <Route path="/:id" element={<Register />}></Route>
        <Route path="/participants/:id" element={<Participants />}></Route>
      </Routes>
    </div>
  );
}

export default App;
