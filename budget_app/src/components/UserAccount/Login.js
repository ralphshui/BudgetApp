import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

import cutewallet from '../../images/cute-wallet.jpg'
import './Intro.css'

const Login = () => {
    
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string().required("Must have username"),
        password: yup.string().required("Must have password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                        navigate('/main')
                }
            }).then(()=> window.location.reload(true))
        }
    })
    
    return (
        <div className='intro'>
            <div> 
            <h1>
                Be <span className='happy'>Happy.</span>
            </h1>
            <p>
                The first step to financial freedom is personal budgeting. 
                Begin your jouney today.
            </p>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">username: </label>
                <input id="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                <span style={{ color: "red", fontSize: '1rem' }}> {formik.errors.username}</span>
                <label htmlFor="password">password:</label>
                <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <p style={{ color: "red", fontSize: '1rem' }}> {formik.errors.password}</p>
                <button type="submit" className='btn btn--dark'>Submit</button>
            </form>
        </div>
            <img src={cutewallet} alt='cartoon-wallet'/>
        </div>
    )
}

export default Login;