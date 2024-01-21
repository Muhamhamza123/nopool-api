import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import UplaodForm from './pages/UploadForm';
import Login from './pages/Login';
import HelpComponent from './pages/Help';
import Search from './pages/Search';
import AdminLogin from './admin/components/AdminLogin';
import Home from './pages/home';
import MyProfile from './pages/MyProfile';
import MyProjects from './pages/MyProjects';
import TopNavBar from './global-components/TopNavBar';
import SideNavBar from './global-components/SideNavBar';

import '../src/styles/App.css';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile/:username" element={<MyProfile />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/user" element={<Login userType="user" />} />
          <Route
            path="/home/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <Home />
                </div>
              </React.Fragment>
            }
          />
          <Route
            path="/MyProjects/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <MyProjects />
                </div>
              </React.Fragment>
            }
          />


<Route
            path="/Search/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <Search/>
                </div>
              </React.Fragment>
            }
          />
          

<Route
            path="/HelpComponent/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <HelpComponent/>
                </div>
              </React.Fragment>
            }
          />
          

       
<Route
            path="/UploadForm/:username"
            element={
              <React.Fragment>
                <TopNavBar />
                <div className="content-container">
                  <SideNavBar />
                  <UplaodForm/>
                </div>
              </React.Fragment>
            }
          />


          <Route
            path="/*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
       
      </div>

    </Router>
  );
};

export default App;
