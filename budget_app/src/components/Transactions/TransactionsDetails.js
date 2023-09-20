import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCurrentUser } from "../../CurrentUserContext"
import TransactionsTable from './TransactionsTable'


const TransactionsDetails = () => {

  const [allAccounts, setAllAccounts] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const { user } = useCurrentUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch
          (`http://127.0.0.1:5555/useraccounts/${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          setAllAccounts(data);
        } 
      }catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchData();
  }, [user]);

  const displayAccountNames = allAccounts.map((account, index) => (
    <option key={index} value={account.id}>{account.name}</option> ));

  useEffect(() => {
    fetch("http://127.0.0.1:5555/categories")
    .then(response => response.json())
    .then(data => {setAllCategories(data)})
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
  }, []);

  const displayCategoryNames = allCategories.map((category, index) => (
    <option key={index} value={category.name}>{category.name}</option> ));

  const formSchema = yup.object().shape({
      account: yup.string().required("Must have an account selected"),
      type: yup.string().required("Must have a type selected"),
      category: yup.string().required("Must have a category selected"),
      description: yup.string().required("Must have description"),
      amount: yup.number().required("Must have amount"),
  })

  const formik = useFormik({
      initialValues: {
          account: "",
          type: "",
          description: "",
          amount: "",
          category: "",
          date: new Date(),
      },
      validationSchema: formSchema,
      onSubmit: async () => {

        let date = formik.values.date.toLocaleDateString()
        try {
          const transactionResponse = await fetch(`http://127.0.0.1:5555/transactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "account_id": formik.values.account,
              "description": formik.values.description,
              "type": formik.values.type,
              "amount": formik.values.amount,
              "date": date,
              "category": formik.values.category
            }),
          });
          if (transactionResponse.status === 201) {
            console.log("Transaction created");
          }

          const accountResponse = await fetch(`/accounts/${formik.values.account}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const accountData = await accountResponse.json();
          let updatedBalance;
         
          if (formik.values.type === 'Income') {
            updatedBalance = parseInt(accountData.balance) + parseInt(formik.values.amount);
          } else {
            updatedBalance = parseInt(accountData.balance) - parseInt(formik.values.amount);
          }

          const updateBalanceResponse = await fetch(`/accounts/${formik.values.account}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "balance": updatedBalance,
            }),
          });
          if (updateBalanceResponse.status === 201) {
            console.log("Account Balance Updated");
          }
          window.location.reload(true);
        }catch (error) {
          console.error("Error:", error);
        }
      } 
  })

return (    
  <div>
    <div className='card--container'>
    <div className='card--wrapper'>
        <div className='add-transaction--card'>
        <h2>Add New Transaction: </h2>
          <div className='card--header'>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="account" className='name'>Account:</label>
            <select id='account' name='account' className='name'
              value={formik.values.account} onChange={formik.handleChange}>
              <option>select account</option>
              {displayAccountNames}
            </select>
            <p className='trans-error'>{formik.errors.account}</p>
            <div className='spacing-top'>
              <label htmlFor="type" className='name'>Type:</label>
              <select id='type' name='type' className='name'
                value={formik.values.type} onChange={(e) => {
                  formik.handleChange(e);
                  if (e.target.value === 'Income') {
                    formik.setFieldValue('category', "Income");
                  }
                  if (e.target.value === 'Expense') {
                    formik.setFieldValue('category', '');
                  }
                }}>
                <option>select type</option>
                <option value='Income'>Income</option>
                <option value='Expense'>Expense</option>
              </select>
              <p className='trans-error'>{formik.errors.type}</p> 
            </div>
            <div className='spacing-top'>
              <label htmlFor="category" className='name'>Category:</label>
              <select id='category' name='category' className='name' 
                value={formik.values.category} onChange={formik.handleChange}
                disabled={formik.values.type === 'Income'}>
                <option value=''>select category</option>
                {displayCategoryNames}
              </select>
              <p className='trans-error'>{formik.errors.category}</p> 
            </div>
            <div className='spacing-top'>
              <label htmlFor="description" className='name'>Description:</label>
              <input id="description" className='form-input' name="description"
                onChange={formik.handleChange}
                value={formik.values.description} placeholder="e.g. Groceries"/>
              <p className='trans-error'> {formik.errors.description}</p>
            </div>
            <div className='spacing-top spacing-bottom'>
              <label htmlFor="amount" className='name'>Amount:</label>
              <input id="amount" className='form-input' name="amount"
                onChange={formik.handleChange}
                value={formik.values.amount} placeholder="e.g. 100"/>
              <p className='trans-error'> {formik.errors.amount}</p>
            </div>
            <div className='spacing-top '>
            <label htmlFor="date" className='name'>Date:</label>
            <br></br>
            <DatePicker id="date" className='form-input' name="date"
                onChange={(date) => formik.setFieldValue('date', date)}
                selected={formik.values.date}/>
            </div>
            
            <button className='button-1'type="submit">Submit</button>
          </form>
          </div>
        </div>
    </div>
    </div>
    <div className='accounts--container'>
    <TransactionsTable allAccountsByUser={allAccounts} />
    </div>
  </div>
  )
}

export default TransactionsDetails
