import { Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions/Questions";
import Exam from "./pages/Exam/Exam";
import ExamDetails from "./pages/ExamDetails/ExamDetails";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import TopNav from "./components/TopNav/TopNav";
import { AuthContext } from "./context/AuthContextProvider";
import { useContext } from "react";
import TestYourself from "./pages/TestYourself/TestYourself";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user && <Login />}
      {user && (
        <>
          <TopNav userEmail={user.email} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="exam/:examUid" element={<ExamDetails />} />
            <Route path="exam" element={<Exam />} />
            <Route path="questions" element={<Questions />} />
            <Route path="testyourself/:examUid" element={<TestYourself />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
