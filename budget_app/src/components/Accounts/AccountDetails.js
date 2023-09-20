import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import AccountCard from './AccountCard.js'
import { useCurrentUser } from "../../CurrentUserContext"

const AccountDetails = () => {

    const { user } = useCurrentUser()
    const [userAccounts, setUserAccounts] = useState([])

    const formSchema = yup.object().shape({
        name: yup.string().required("Must have account name"),
        balance: yup.number().required("Must have balance")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            balance: "",

        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/accounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    "user_id": user?.id,
                }),
            }).then((resp) => {
                if (resp.status === 201) {
                    resp.json()
                    console.log("Account created")
                }
            }).then(()=> window.location.reload(true))
        }
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/useraccounts/${user?.id}`);
            if (response.ok) {
              const data = await response.json();
              setUserAccounts(data);
            } 
          } catch (error) {
            console.error('Error fetching accounts:', error);
          }
        };
    
        fetchData();
      }, [user]);
      
    const displayallAccounts = userAccounts?.map((account, index) =>  {
        return(<AccountCard key={index} name={account.name} 
            account_id={account.id} balance={account.balance} />)})

    return (    
    <div>
        <div className='card--container'>
        <div className='card--wrapper'>
            <div className='add-account--card'>
            <h2>Add New Account: </h2>
                <div className='card--header'>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name" className='name'>Account Name: </label>
                    <input id="name" className='form-input' name="name" onChange={formik.handleChange} 
                        value={formik.values.name} placeholder="e.g. Savings Account"/>
                    <p style={{ color: "red" }}> {formik.errors.name}</p>
                    <label htmlFor="balance" className='name'>Account Balance:</label>
                    <input id="balance" className='form-input' name="balance" onChange={formik.handleChange}
                        value={formik.values.balance} placeholder="e.g. 1000"/>
                    <p style={{ color: "red" }}> {formik.errors.balance}</p>
                    <button className='button-1'type="submit">Submit</button>
                </form>
                </div>
            </div>
        </div>
        </div>
        <div className='accounts--container'>
        <h3 className='account--title'>All Financial Accounts:</h3>
        <div className='card--wrapper'>
            {displayallAccounts}      
        </div>
        </div>
    </div>
    )
}

export default AccountDetails