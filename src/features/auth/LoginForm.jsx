import { useState } from "react";
import { authLogin } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit'

export const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { token } = useSelector(state => state.auth)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInput(input => ({ ...input, [name]: value }))
    }
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(authLogin({ input }))
            unwrapResult(resultAction)
            console.log({ resultAction, state, token })
            navigate(state.from)
        } catch (error) {
            console.log("Failed to login: ", error)
        }
    }
    return (
        <div className="Login flex flex--center">
            <div className="Login-card card flex flex--column flex--align_center flex--justify_evenly">
                <h3 className="Login-badge badge bg-gray-300">Login</h3>
                <form className="Login-form flex flex--column flex--justify_around" action="#">
                    <div className="input-container flex flex--column">
                        <label className="input-label">Email</label>
                        <input value={input.email} onChange={(e) => handleInputChange(e)} className="input" type="email" name="email" placeholder="Enter your Email" />
                    </div>
                    <div className="input-container flex flex--column">
                        <label className="input-label">Password</label>
                        <input value={input.password} onChange={(e) => handleInputChange(e)} className="input" type="password" name="password" placeholder="Enter your Password" />
                    </div>
                    <button type="submit" onClick={(e) => loginHandler(e)} className="Login-btn btn btn-secondary btn-round--corner">Submit</button>
                </form>
            </div>
        </div>
    )
}