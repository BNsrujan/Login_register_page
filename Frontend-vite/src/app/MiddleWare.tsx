import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

function MiddleWare() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                // Optionally, you can verify the token here or check its validity
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <Navigate to='/Dashboard' />
            ) : (
                <Navigate to='/login' state={{ from: location }} />
            )}
        </div>
    );
}

export default MiddleWare;

