/* eslint-disable react/prop-types */
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [selectedDetails, setSelectedDetails] = useState([]);

    const authInfo = useMemo(() => ({
        selectedDetails, setSelectedDetails
    }), [selectedDetails, setSelectedDetails]);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;