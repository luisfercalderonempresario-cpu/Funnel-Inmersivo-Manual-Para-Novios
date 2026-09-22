/**
 * MPN - Main Application Root
 * Mounts the Funnel Interactive Router and layout boundaries.
 */

import React from "react";
import { AppRoutes } from "./router/AppRoutes";

export const App: React.FC = () => {
  return <AppRoutes />;
};

export default App;
