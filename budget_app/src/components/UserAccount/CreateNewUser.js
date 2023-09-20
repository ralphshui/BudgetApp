import { useFormik } from "formik";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import cutewallet from '../../images/cute-wallet.jpg'

import './Intro.css'

function CreateNewUser() {
    
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
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((resp) => {
                if (resp.ok) {
                    resp.json();
                } 
            }).then(navigate('/login'))
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
            <label htmlFor="username">New Username: </label>
            <input id="username" name="username" onChange={formik.handleChange} 
                value={formik.values.username} />
            <p style={{ color: "red", fontSize: '1rem' }}> {formik.errors.username}</p>
            <label htmlFor="password">New Password:&nbsp;&nbsp;</label>
            <input id="password" name="password" onChange={formik.handleChange}
                value={formik.values.password}/>
            <p style={{ color: "red", fontSize: '1rem' }}> {formik.errors.password}</p>
            <button type="submit" className='btn btn--dark'>Submit</button>
        </form>
        </div>
        <img src={cutewallet} alt='cartoon-wallet'/>
        </div>
    )
}

export default CreateNewUser;