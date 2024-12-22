import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';


export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [logError, setLogError] = useState("");

    const validateForm = (): boolean => {
        let isValid = true;
        setEmailError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim() || !emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });
            console.log(response);
            const { accessToken, refreshToken } = response.data;

            if (accessToken && refreshToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                navigate("/dashboard");
            } else {
                setLogError("Login failed. Please try again.");
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                if (status === 400) setLogError("Invalid email or password. Please try again.");
                else if (status === 401) setLogError("You are not authorized to access this resource.");
                else setLogError(data || "An unexpected error occurred.");
            } else {
                setLogError("A network error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="relative h-screen w-full bg-transparent flex items-center justify-center antialiased px-4 sm:px-8 md:px-16">
            <div className="relative flex flex-col border border-gray-100 rounded-md w-full max-w-lg items-center justify-center h-auto shadow-md py-8 px-6">
                <div className="relative mb-3 w-full ">
                    <h1 className="text-3xl md:text-4xl uppercase tracking-normal bg-clip-text text-transparent bg-black font-sans font-bold">
                        Sign In
                    </h1>
                    <p className="text-gray-500 text-xs tracking-wide">
                        <span className="text-blue-400">Welcome back!</span> Please enter your details
                    </p>
                </div>
                <form className="relative flex flex-col gap-6 w-full" onSubmit={handleLogin}>
                    <div className="relative w-full mb-2">
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 border rounded-lg text-base bg-blue-50 px-4 bg-transparent text-black outline-none focus:border focus:border-blue-900 duration-200"
                        />
                        <label
                            htmlFor="email"
                            className={`absolute text-sm pointer-events-none duration-300 left-4 ${email
                                ? "-top-2 text-xs bg-white px-1 text-blue-900"
                                : "top-1/2 transform -translate-y-1/2 text-base text-gray-400"
                                }`}
                        >
                            Enter email
                        </label>
                        {emailError && <p className=" absolute -bottom-5 text-red-500 text-sm">{emailError}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 border bg-blue-50 rounded-md text-base px-4 bg-transparent text-black outline-none focus:border focus:border-blue-900 duration-200"
                        />
                        <label
                            htmlFor="password"
                            className={`absolute text-sm pointer-events-none duration-300 left-4 ${password
                                ? "-top-2 text-xs bg-white px-1 text-blue-900"
                                : "top-1/2 transform -translate-y-1/2 text-base text-gray-400"
                                }`}
                        >
                            Enter password
                        </label>
                        {logError && <p className=" absolute   text-red-500 text-sm">{logError}</p>}
                    </div>

                    <div className="mt-4 w-full">
                        <button className="w-full h-12 bg-blue-500 ring-offset-2 text-bold font-sans hover:bg-blue-600 shadow-md hover:shadow-lg transition duration-300 tracking-wide hover:border-none rounded-md px-4 text-center text-blue-50 outline-blue-600 ">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="mt-4 w-full text-center text-neutral-500 tracking-wide text-sm">
                    Don't have an account?{" "}
                    <span className="text-blue-700 text-md cursor-pointer font-semibold hover:underlineo">
                        <button onClick={() => navigate('/signup')}>
                            Sign up
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}
