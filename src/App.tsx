import React from "react";

import { Nav } from "./components/Nav";
import { HomePage } from "./components/Home/HomePage";
import { AppContext, useAppState } from "./utils/app-context";

function Wrangl() {
  const appState = useAppState();
  return (
    <AppContext.Provider value={appState}>
      <Nav />
      <HomePage />
    </AppContext.Provider>
  );
}

export default Wrangl;
