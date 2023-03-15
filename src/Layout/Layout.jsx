import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import NotFound from "../Pages/NotFound";
import UserInfo from "../Pages/UserInfo";

const Layout = ({ user }) => {
  const [menu, setMenu] = useState(true);
  return (
    <>
      <NavBar menu={menu} setMenu={setMenu} user={user} />
      <SideBar menu={menu} />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          
            <Route path="/userInfo" element={<UserInfo user={user} />} />

            {/* <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
            <Route path="/accountInfo" element={<AccountInfo user={user}/>} /> */}
          </Routes>

          
        </div>
      </div>
    </>
  );
};

export default Layout;
