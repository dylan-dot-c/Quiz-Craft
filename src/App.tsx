import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp";
import { UserProvider } from "./contexts/userContext";
import Login from "./views/Login";
import Home from "./views/Home";
import Quizzes from "./views/Quizzes";
import AttemptQuiz from "./views/AttemptQuiz";
import DashBoard from "./views/DashBoard";
import EditQuiz from "./views/EditQuiz";
function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/quizzes' element={<Quizzes />} />
                    <Route path='/quiz/:id' element={<AttemptQuiz />} />
                    <Route path='/dashboard' element={<DashBoard />} />
                    <Route path='/quiz/edit/:quiz_id' element={<EditQuiz />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
