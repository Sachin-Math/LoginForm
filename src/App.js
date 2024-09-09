import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./login with axios/LoginForm";
import LoginFormValidation from "./dipesh login/LoginFormValidation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/validation" element={<LoginFormValidation />} />
      </Routes>
    </Router>
  );
};

export default App;
