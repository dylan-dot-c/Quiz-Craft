import React, { useState, createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

type UserContextProps = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(getUser);
    const navigate = useNavigate();

    function getUser(): User | null {
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user) as User;
        } else {
            return null;
        }
    }

    const login = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be user within a UserProvider");
    }
    return context;
};
