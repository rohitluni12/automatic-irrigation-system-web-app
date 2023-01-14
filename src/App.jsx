import "./App.css";
import Login from "./Pages/Login/index";
import Home from "./Pages/Home/index";
import Admin from "./Pages/Admin/index";
import PageNotFound from "./Pages/PageNotFound/index";

import { UserAuthContextProvider } from "./Context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Home" element={<Home />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
