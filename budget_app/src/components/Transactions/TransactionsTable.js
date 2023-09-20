import React, { useState, useEffect } from 'react'
import { useCurrentUser } from "../../CurrentUserContext"
const TransactionsTable = () => {

  const [allTransactions, setAllTransactions] = useState([])
  const { user } = useCurrentUser()

  useEffect(() => {
    fetch("/transactions")
    .then(response => response.json())
    .then(data => {setAllTransactions(data)})
    .catch(error => {
        console.error('Error fetching transactions:', error);
    });
  }, []);
  
    const filteredTransactionsByUser = allTransactions.filter(transaction => {
      const user_id = transaction.account.user.id;
      return user_id === user?.id;
    });
    
    const displayTransactions= filteredTransactionsByUser.map((transaction, index) => 
      (
      <tr className=
        {transaction.type =="Income" ? 'light-green':'light-red'}
        key={index}>
        <td>{transaction.date}</td>
        <td>{transaction.account.name}</td>
        <td>{transaction.type}</td>
        <td>{transaction.description}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.categories[0]?.name}</td>
      </tr>
      ));

  return (
    <div className='table--wrapper'>
        <h3 className="transaction--title">All Transactions</h3>
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                      <th>Date</th>
                      <th>Account</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                    <tbody>
                      {displayTransactions}
                    </tbody>
            </table>
        </div>
    </div>

  )
}

export default TransactionsTable