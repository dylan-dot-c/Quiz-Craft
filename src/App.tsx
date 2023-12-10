import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp";
import { UserProvider } from "./contexts/userContext";
import Login from "./views/Login";
import Home from "./views/Home";
import Quizzes from "./views/Quizzes";
import AttemptQuiz from "./views/AttemptQuiz";
import DashBoard from "./views/DashBoard";
import EditQuiz from "./views/EditQuiz";
import PrivateRoute from "./components/PrivateRoute";
function App() {
    return (
        <HashRouter>
            <UserProvider>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/quizzes' element={<Quizzes />} />
                    <Route
                        path='/quiz/:id'
                        element={
                            <PrivateRoute>
                                <AttemptQuiz />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/dashboard'
                        element={
                            <PrivateRoute>
                                <DashBoard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/quiz/edit/:quiz_id'
                        element={
                            <PrivateRoute>
                                <EditQuiz />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </UserProvider>
        </HashRouter>
    );
}

export default App;
