import { Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions/Questions";
import Exam from "./pages/Exam/Exam";
import ExamDetails from "./pages/ExamDetails/ExamDetails";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./components/Login";
import useAuth from "./utils/useAuth";
import TopNav from "./components/TopNav";

const App = () => {
  const { user } = useAuth();

  return (
    <div>
      <Login />
      {user && (
        <>
          <TopNav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="exam/:examId" element={<ExamDetails />} />
            <Route path="exam" element={<Exam />} />
            <Route path="questions" element={<Questions />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
