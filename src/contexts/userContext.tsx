import React, { useState, createContext, ReactNode, useContext } from "react";

type UserContextProps = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>({
        firstName: "Dylan",
        lastName: "Heslop",
        email: "heslopd23@gmail.com",
        id: 123,
    });

    const login = (newUser: User) => {
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
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
