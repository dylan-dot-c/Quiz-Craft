import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import React from "react";
import { toast } from "react-toastify";

type Props = {
    children: React.ReactNode;
};
function PrivateRoute({ children }: Props) {
    const { user } = useUser();
    if (user) {
        return children;
    } else {
        toast.warn("Please login to continue");
        return (
            <Navigate
                to={`/login?redirect_url=${
                    window.location.href.split("/#")[1]
                }`}
            />
        );
    }
}

export default PrivateRoute;
