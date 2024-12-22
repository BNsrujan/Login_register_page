import { Navigate, Outlet } from 'react-router';
import { useEffect, useState } from 'react';

function MiddleWare() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            setIsAuthenticated(!!(accessToken && refreshToken));
            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("Is Authenticated:", isAuthenticated);
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default MiddleWare;

