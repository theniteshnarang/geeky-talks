import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAuth } from "./authSlice"
export const Register = ({ children }) => {
    const { token } = useSelector(selectAuth)

    return (
        <>
            <nav className="Register flex flex--center">
                {token ? <h1 className="color-light mt-4">You Are Already Logged In</h1> : (
                    <ul className="NavLogin flex flex--center bg-gray-600">
                        <li className="NavLogin-item">
                            <NavLink className="btn btn-primary" to="/login">Login</NavLink>
                        </li>
                        <li className="NavLogin-item ml-1">
                            <NavLink className="btn btn-primary" to="/sign-up">SignUp</NavLink>
                        </li>
                    </ul>)}
            </nav>
            {!token && children}
        </>
    )
}

