import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createHashRouter, Outlet } from "react-router-dom";
import SignUp from "./views/SignUp";
import { UserProvider } from "./contexts/userContext";
import Login from "./views/Login";
import Home from "./views/Home";
import Quizzes from "./views/Quizzes";
import AttemptQuiz from "./views/AttemptQuiz";
import DashBoard from "./views/DashBoard";
import EditQuiz from "./views/EditQuiz";
import PrivateRoute from "./components/PrivateRoute";
import Submissions from "./views/Submissions";
import Root from "./RootLayout";
import SideBar from "./SideBar";
import UserQuizzes from "./components/UserQuizzes";
import UserInfo from "./components/UserInfo";
import SubmissionTable from "./views/SubmissionTable";
import CompletedQuizzes from "./views/CompletedQuizzes";

export const UserLayout = () => {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    );
};

export const router = createHashRouter([
    {
        path: "",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <Root />,
                children: [
                    { path: "", element: <Home /> },
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "signup",
                        element: <SignUp />,
                    },
                    {
                        path: "quizzes",
                        element: <Quizzes />,
                    },
                    {
                        path: "quizzes/:quiz_id",
                        element: (
                            <PrivateRoute>
                                <AttemptQuiz />
                            </PrivateRoute>
                        ),
                    },
                ],
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <SideBar />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "",
                        element: <DashBoard />,
                    },
                    {
                        path: "quizzes",
                        element: <UserQuizzes />,
                    },
                    {
                        path: "quizzes/edit/:quiz_id",
                        element: <EditQuiz />,
                    },
                    {
                        path: "submissions/quiz/:quiz_id",
                        element: <Submissions />,
                    },
                    {
                        path: "submissions",
                        element: <SubmissionTable />,
                    },
                    {
                        path: "completed",
                        element: <CompletedQuizzes />,
                    },
                    {
                        path: "profile",
                        element: <UserInfo />,
                    },
                ],
            },
        ],
    },
]);
