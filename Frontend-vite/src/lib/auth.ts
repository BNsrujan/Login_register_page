import axios from 'axios';

export const fetchProtectedData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return null;
    }

    try {
        const response = await axios.get("http://localhost:5000/api/protected-route", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching protected data:", error);
        if (error.response?.status === 401) {
            const newAccessToken = await refreshAccessToken();
            return await axios.get("http://localhost:5000/api/protected-route", {
                headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                },
            }).then(res => res.data);
        }
    }
};

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post("http://localhost:5000/api/refresh", {
            token: refreshToken,
        });
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};
