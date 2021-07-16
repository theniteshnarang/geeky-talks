import { Register } from "./Register";
import { useState } from "react";
import { handleInputChange } from "./utils/inputHandler";
import { authSignUp } from "./authSlice";
import { useNavigate } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export const SignUp = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signUpHandler = async (e, input) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(authSignUp({ input }))
            unwrapResult(resultAction)
            navigate('/login')
            toast.success("Sign-up Successfull, Please Login!")
        } catch (error) {
            console.log("Failed to login: ", error)
            toast.error("Login Failed, Try Again")
        }
    }

    return (
        <Register>
            <div className="SignUp flex flex--center">
                <div className="SignUp-card card flex flex--column flex--align_center flex--justify_evenly">
                    <h3 className="SignUp-badge badge bg-gray-300">Signup</h3>
                    <form className="SignUp-form flex flex--column flex--justify_around" action="#">
                        <div className="input-container flex flex--column">
                            <label className="input-label">Name</label>
                            <input
                                onChange={(e) => handleInputChange(e, setInput)}
                                className="input"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="input-container flex flex--column">
                            <label className="input-label">Email</label>
                            <input
                                onChange={(e) => handleInputChange(e, setInput)}
                                className="input"
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                            />
                        </div>
                        <div className="input-container flex flex--column">
                            <label className="input-label">Password</label>
                            <input
                                onChange={(e) => handleInputChange(e, setInput)}
                                className="input"
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                            />
                        </div>
                        <button type="submit" onClick={(e) => signUpHandler(e, input)} className="SignUp-btn btn btn-secondary btn-round--corner">Submit</button>
                    </form>
                </div>
            </div>
        </Register>
    )
}
