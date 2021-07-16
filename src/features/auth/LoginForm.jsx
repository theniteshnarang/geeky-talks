import { useState } from "react";
import { authLogin } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit'
import { Register } from "./Register";
import { handleInputChange } from "./utils/inputHandler";
import { toast } from "react-toastify";

export const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(authLogin({ input }))
            unwrapResult(resultAction)
            navigate(state?.from || '/')
            toast.success("Login Successfull!")
        } catch (error) {
            console.log("Failed to login: ", error)
            toast.error("Login Failed, Try Again")
        }
    }
    return (
        <Register>
            <div className="Login flex flex--center">
                <div className="Login-card card flex flex--column flex--align_center flex--justify_evenly">
                    <h3 className="Login-badge badge bg-gray-300">Login</h3>
                    <form className="Login-form flex flex--column flex--justify_around" action="#">
                        <div className="input-container flex flex--column">
                            <label className="input-label">Email</label>
                            <input value={input.email} onChange={(e) => handleInputChange(e, setInput)} className="input" type="email" name="email" placeholder="Enter your Email" />
                        </div>
                        <div className="input-container flex flex--column">
                            <label className="input-label">Password</label>
                            <input value={input.password} onChange={(e) => handleInputChange(e, setInput)} className="input" type="password" name="password" placeholder="Enter your Password" />
                        </div>
                        <button type="submit" onClick={(e) => loginHandler(e)} className="Login-btn btn btn-secondary btn-round--corner">Submit</button>
                    </form>
                </div>
            </div>
        </Register>
    )
}