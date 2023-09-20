import React, {useEffect, useState} from 'react'
import { useCurrentUser } from "../../CurrentUserContext"
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import PieChart from './PieChart';

const StatisticsDetails = () => {
  
  const { user } = useCurrentUser()
  const [userAccounts, setUserAccounts] = useState([])
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/useraccounts/${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserAccounts(data)
        } 
      }catch (error) {
        console.error('Error fetching accounts:', error);
      }
      };
      fetchData();
    }, [user]);

  useEffect(() => {
    fetch("/transactions")
    .then(response => response.json())
    .then(data => {
      setAllTransactions(data)
    })
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

  const incomeTransactions = filteredTransactionsByUser.filter(transaction => 
    transaction.type === "Income");

  const areaData =({
    labels: filteredTransactionsByUser.map((data) => data.date),
    datasets:[
      {
        label:"Transaction Amount",
        data: filteredTransactionsByUser.map((data) => data.amount),
      },
    ],
  })
  const barData = ({
    labels: userAccounts.map((data) => data.name),
    datasets:[
      {
        label:"Balance",
        data: userAccounts.map((data) => data.balance),
      },
    ],

  })

  const barColors = ["red", "green","blue","orange","brown"]
  const barColors2 = [
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#b91d47",
  ];
  const pieDataExpense =({
    labels: expenseTransactions.map((data) => data.categories[0].name),
    datasets:[
      {
        label:"$",
        data: expenseTransactions.map((data) => data.amount),
        backgroundColor: barColors,
      },
    ],
  })

  const pieDataIncome =({
    labels: incomeTransactions.map((data) => data.description),
    datasets:[
      {
        label:"$",
        data: incomeTransactions.map((data) => data.amount),
        backgroundColor: barColors2,
      },
    ],
  })

  return (   
    <div className='header--title'>
      <div className='bar--container'>
      <h2 style={{ textAlign: 'center' }}>Account Balances</h2>
        <BarChart barChartData={barData}/>
      </div>
      <div className='bar--container'>
      <h2 style={{ textAlign: 'center' }}>Transaction Amounts Over Time</h2>
        <AreaChart areaChartData={areaData}/>
      </div>
      <div className='pie--container'>
      <h2 style={{ textAlign: 'center' }}>Expenses By Category</h2>
        <PieChart pieChartData={pieDataExpense}/>
      </div>
      <div className='pie--container'>
      <h2 style={{ textAlign: 'center' }}>Income By Description</h2>
        <PieChart pieChartData={pieDataIncome}/>
      </div>
    </div>
  )
}

export default StatisticsDetails