import React, { useState, useEffect } from 'react'
import { useCurrentUser } from "../../CurrentUserContext"

import LineChart from './LineChart';

const DashBoard = () => {

  const quotesURL= 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
  const [allQuotes, setAllQuotes] = useState([])

  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [totalAssets, setTotalAssets] = useState(0)
  const [allTransactions, setAllTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useCurrentUser()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/useraccounts/${user?.id}`);
        if (response.ok) {
          const data = await response.json();

          let sum = 0;         
            
          data.forEach(account => {
            sum += account.balance;
          });
          setTotalAssets(sum)
        } 
      }catch (error) {
        console.error('Error fetching accounts:', error);
      }
      };
      fetchData();
    }, [user]);
  
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        fetch(quotesURL)
        .then(response => response.json())
        .then(data => {
          setAllQuotes(data.quotes);
          const random = Math.floor(Math.random() * allQuotes.length);
          setQuote(data.quotes[random].quote);
          setAuthor(data.quotes[random].author);
          setIsLoading(false);  
        })
      }catch(error){
        console.error('Error fetching quotes:', error);
        };
    }
    fetchQuote();
  }, [isLoading]);
  
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
  
  const expenseTransactions = filteredTransactionsByUser.filter(transaction => 
    transaction.type === "Expense");

  let expenseTotal = 0;
    for (const transaction of expenseTransactions) {
      expenseTotal += transaction.amount;
    }
  
  const incomeTransactions = filteredTransactionsByUser.filter(transaction => 
    transaction.type === "Income");
    
  let incomeTotal = 0;
    for (const transaction of incomeTransactions) {
      incomeTotal += transaction.amount;
    }

  const allDates = [
    ...incomeTransactions.map((data) => data.date),
    ...expenseTransactions.map((data) => data.date),
  ];

  const uniqueDates = [...new Set(allDates)];

  const sortedDates = uniqueDates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  const lineData = ({
    labels:sortedDates,
    datasets:[
      {
        label:"Income",
        data: incomeTransactions.map((data) => data.amount),
        backgroundColor: 'green'
      },
      {
        label:"Expenses",
        data: expenseTransactions.map((data) => data.amount),
        backgroundColor: 'red'
      },
    ],
  })

  const displayTransactions= filteredTransactionsByUser.slice(-3).map((transaction, index) => 
    (
    <tr className=
      {transaction.type =="Income" ? 'light-green':'light-red'}
      key={index}>
      <td>{transaction.account.name}</td>
      <td>{transaction.description}</td>
      <td>{transaction.amount}</td>
    </tr>
    ));

  return (   
    <div>
      <div className='line--container'>
      <LineChart lineChartData={lineData} />
        <div className='history--container'>
        <h3 className='main--title'>Recent Histroy: </h3>
        <table>
            <thead>
              <tr>
                <th>Account</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
              <tbody>
                {displayTransactions}
              </tbody>
          </table>
          </div>
      </div>
      <div className='dash--container'>
        <h3 className='main--title'>Total Assets: </h3>
        <span style={{ color: 'green' }}>$ {totalAssets}</span>
      </div>
      <div className='dash--container'>
          <h3 className='main--title'>Total Expenses: </h3>
          <span style={{ color: 'red' }}>$ {expenseTotal}</span>
      </div>
      <div className='quote--container'>
        <h3 style={{ color: '#FF1493' }}> "{quote}"</h3>
        <span> -{author}</span>
      </div>
    </div> 
  )
}

export default DashBoard