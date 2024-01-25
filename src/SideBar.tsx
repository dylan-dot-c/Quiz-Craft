import {
    BoxArrowRight,
    Check2All,
    Compass,
    Person,
    QuestionSquare,
    Speedometer2,
} from "react-bootstrap-icons";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useUser } from "./contexts/userContext";

const dashboardLinks = [
    {
        title: "Dashboard",
        link: "/dashboard",
        icon: <Speedometer2 size={30} />,
    },
    {
        title: "My Quizzes",
        link: "/dashboard/quizzes",
        icon: <QuestionSquare size={30} />,
    },
    {
        title: "Quizzes Completed",
        link: "/dashboard/completed",
        icon: <Check2All size={30} />,
    },
    {
        title: "Submissions",
        link: "/dashboard/submissions",
        icon: <Compass size={30} />,
    },
    {
        title: "My Profile",
        link: "/dashboard/profile",
        icon: <Person size={30} />,
    },
];
const SideBar = () => {
    return (
        <div>
            <aside className='position-fixed h-100 bg-dark text-white shadow-lg p-3 d-flex flex-column justify-content-between d-md-block  '>
                <SideBarBody />
            </aside>

            {/* <ResponsiveExample /> */}
            <main className='mt-5'>
                <Outlet />
            </main>
        </div>
    );
};

export const SideBarBody = () => {
    const { logout } = useUser();

    return (
        <div className='d-flex flex-column justify-content-between h-100 '>
            <div>
                <Link to='/'>
                    <p className='fs-4'>Quiz Craft</p>
                </Link>
                <hr />
                <ul>
                    {dashboardLinks.map((link, index) => (
                        <NavLink end key={index} to={link.link}>
                            <li className='d-flex gap-2 w-100 align-items-center  '>
                                {link.icon}
                                {link.title}
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </div>
            <button className='logout btn btn-danger w-100 ' onClick={logout}>
                LogOut <BoxArrowRight />
            </button>
        </div>
    );
};
export default SideBar;
