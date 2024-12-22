import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function Register() {
    const [email, setEmail] = useState<string>("");
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [conferPassword, setConferPassword] = useState<string>("");

    // Individual error states
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [fnameError, setFnameError] = useState<string | undefined>(undefined);
    const [lnameError, setLnameError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const [conferPasswordError, setConferPasswordError] = useState<string | undefined>(undefined);
    const [logError, setLogError] = useState<string | undefined>(undefined)

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        let isValid = true;

        // Reset errors
        setEmailError(undefined);
        setFnameError(undefined);
        setLnameError(undefined);
        setPasswordError(undefined);
        setConferPasswordError(undefined);
        setLogError(undefined)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!fname.trim()) {
            setFnameError("First name is required.");
            isValid = false;
        }
        if (!lname.trim()) {
            setLnameError("Last name is required.");
            isValid = false;
        }
        if (!email.trim() || !emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        }
        if (password.length < minLength) {
            setPasswordError("Password must be at least 8 characters long.");
            isValid = false;
        } else if (!hasNumber.test(password)) {
            setPasswordError("Password must contain at least one number.");
            isValid = false;
        } else if (!hasSpecialChar.test(password)) {
            setPasswordError("Password must contain at least one special character.");
            isValid = false;
        }
        if (password !== conferPassword) {
            setConferPasswordError("Passwords do not match.");
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
            const response = await axios.post<{ message: string }>("http://localhost:5000/api/register", {
                name: `${fname}_${lname}`,
                email,
                password,
            });
            console.log(response)
            if (response.status === 200) {
                console.log(response);
                navigate("/dashboard");
            }
            else if (response.status === 409) {
                setLogError("Email already in use.");
            }
            else {
                setLogError("Registration failed. Please try again.")
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setLogError(err.response?.data?.message || "An unexpected error occurred.");
            } else {
                setLogError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="relative h-screen w-full bg-transparent flex items-center justify-center antialiased px-4 sm:px-8 md:px-16">
            <div className="flex flex-col border border-gray-100 rounded-md w-full max-w-lg items-center justify-center h-auto shadow-md py-8 px-6">
                <div className="relative mb-3 w-full">
                    <h1 className="text-3xl md:text-4xl uppercase tracking-normal bg-clip-text text-transparent bg-black font-sans font-bold">
                        Sign Up
                    </h1>
                    <p className="text-gray-500 text-xs tracking-wide">
                        Please Create a new account
                    </p>
                </div>
                <form className="flex flex-col gap-6 w-full" onSubmit={handleLogin}>
                    <div className="w-69 flex gap-2">
                        <div className="relative w-1/2 ">
                            <input
                                type="text"
                                id="fname"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                className="w-full h-12 border rounded-lg text-base bg-blue-50 px-4 bg-transparent text-black outline-none focus:border focus:border-blue-900 duration-200"
                            />
                            <label
                                htmlFor="fname"
                                className={`absolute text-sm pointer-events-none duration-300 left-4 ${fname
                                    ? "-top-2 text-xs bg-white px-1 text-blue-900"
                                    : "top-1/2 transform -translate-y-1/2 text-base text-gray-400"
                                    }`}
                            >
                                First name
                            </label>
                            {fnameError && <p className=" absolute -bottom-5 left-1 text-red-500 text-sm">{fnameError}</p>}
                        </div>
                        <div className="relative w-1/2">
                            <input
                                type="text"
                                id="lname"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                className="w-full h-12 border rounded-lg text-base bg-blue-50 px-4 bg-transparent text-black outline-none focus:border focus:border-blue-900 duration-200"
                            />
                            <label
                                htmlFor="lname"
                                className={`absolute text-sm pointer-events-none duration-300 left-4 ${lname
                                    ? "-top-2 text-xs bg-white px-1 text-blue-900"
                                    : "top-1/2 transform -translate-y-1/2 text-base text-gray-400"
                                    }`}
                            >
                                Last name
                            </label>
                            {lnameError && <p className=" absolute -bottom-5 text-red-500 text-sm">{lnameError}</p>}
                        </div>
                    </div>
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

                    <div className="relative w-full mb-2">
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
                        {passwordError && <p className=" absolute -bottom-5 text-red-500 text-sm">{passwordError}</p>}
                    </div>
                    <div className="relative w-full mb-2">
                        <input
                            type="password"
                            id="conferPassword"
                            value={conferPassword}
                            onChange={(e) => setConferPassword(e.target.value)}
                            className="w-full h-12 border bg-blue-50 rounded-md text-base px-4 bg-transparent text-black outline-none focus:border focus:border-blue-900 duration-200"
                        />
                        <label
                            htmlFor="conferPassword"
                            className={`absolute text-sm pointer-events-none duration-300 left-4 ${conferPassword
                                ? "-top-2 text-xs bg-white px-1 text-blue-900"
                                : "top-1/2 transform -translate-y-1/2 text-base text-gray-400"
                                }`}
                        >
                            Confirm Password
                        </label>
                        {conferPasswordError && <p className=" absolute -bottom-5 text-red-500 text-sm">{conferPasswordError}</p>}
                    </div>
                    {logError && <p className="text-red-500 text-sm">{logError}</p>}
                    <div className="mt-4 w-full">
                        <button className="w-full h-12 bg-blue-500 ring-offset-2 text-bold font-sans hover:bg-blue-600 shadow-md hover:shadow-lg transition duration-300 tracking-wide hover:border-none rounded-md px-4 text-center text-blue-50 outline-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="mt-4 w-full text-center text-neutral-500 tracking-wide text-sm">
                    Don't have an account?{" "}
                    <span className="text-blue-700 text-md cursor-pointer font-semibold hover:underline">
                        <button
                            className=""
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Login
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}
