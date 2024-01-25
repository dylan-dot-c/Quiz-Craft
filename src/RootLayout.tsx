import { Outlet } from "react-router-dom";
// import { UserProvider } from "./contexts/userContext";
import Header from "./components/Navbar";

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Root;
