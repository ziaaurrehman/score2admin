import { Routes, Route } from "react-router-dom";
import "./App.css";
import Portal from "./components/pages/Portal.jsx";
import Login from "./components/pages/Login.jsx";
import {} from "./Api.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context";
import {
  Dashboard,
  Fixtures,
  ManageApp,
  ManageLive,
  Leagues,
  News,
  Administration,
  Types,
  CreateMatch,
  EditMatch,
  ContactUs,
  Highlights,
  Notification,
  Logout,
} from "./components/pages/index.js";
import AddNews from "./components/News/AddNews.jsx";
import EditNews from "./components/News/EditNews.jsx";
import CreateNotification from "./components/Notifications/CreateNotification.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-live" element={<ManageLive />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/manage-apps" element={<ManageApp />} />
          <Route path="/selected-leagues" element={<Leagues />} />
          <Route path="/news" element={<News />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/types" element={<Types />} />
          <Route path="/manage-live/edit/:id" element={<EditMatch />} />
          <Route path="/manage-live/create-match" element={<CreateMatch />} />
          <Route path="/news/create-news" element={<AddNews />} />
          <Route path="/news/edit-news/:id" element={<EditNews />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/notifications" element={<Notification />} />
          <Route
            path="/notification/create-notification"
            element={<CreateNotification />}
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        {/* <Portal /> */}
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}

export default App;
