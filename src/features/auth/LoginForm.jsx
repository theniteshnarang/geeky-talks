import { authLogin } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { unwrapResult } from '@reduxjs/toolkit'
import { Register } from "./Register";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Email must be a valid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password is too short - should be 4 chars min")
    });

    const initialValues = {
        email: "",
        password: ""
    };

    const loginHandler = async (input) => {
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            loginHandler(values)
                        }}
                    >
                        {
                            (formik) => {
                                const { errors, touched, isValid, dirty } = formik
                                return (
                                    <Form className="Login-form flex flex--column flex--justify_around">
                                        <div className="input-container flex flex--column">
                                            <label className="input-label">Email</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={`input ${errors.email && touched.email && "input--error"}`}
                                            />
                                            <ErrorMessage name="email" component="span" className="input-error color-red-300"
                                            />
                                        </div>
                                        <div className="input-container flex flex--column">
                                            <label className="input-label">Password</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                className={`input ${errors.password && touched.password && "input--error"}`}
                                            />
                                            <ErrorMessage
                                                name="password" component="span" className="input-error color-red-300"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={`Login-btn btn btn-secondary btn-round--corner ${!(dirty && isValid) && "disabled-btn"}`}
                                            disabled={!(dirty && isValid)}
                                        >
                                            Submit
                                        </button>
                                    </Form>
                                )
                            }
                        }

                    </Formik>
                </div>
            </div>
        </Register>
    )
}