import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreateRoom from './pages/CreateRoom';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoomSettings from './pages/RoomSettings';
import RoomDetails from './pages/RoomDetails';




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />      
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/roomSettings" element={<RoomSettings />} />
        <Route path="/roomDetails" element={<RoomDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
