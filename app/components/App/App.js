import React from "react";
import styles from "./App.module.scss";
import Game from "../Game/Game";

const App = () => (
  <div className={styles.app}>
    <Game />
  </div>
);

export default App;
