import React from "react";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css["home-container"]}>
      <h1 className={css["home-title"]}>Welcome!</h1>
      <p className={css["home-text"]}>
        This is the main page of your application.
      </p>
    </div>
  );
}
