import React from 'react'

const AccountCard = ({ name, balance, account_id }) => {

  const handleDelete = (e) => {
    fetch(`/accounts/${e.target.value}`, {
        method: "DELETE",
    }).then (()=> window.location.reload(true))
  }

  return (
    <div className='account--card light-green'>
    <div className='card--header'>
        <div className='balance'>
            <span style={{ textDecoration: 'underline' }}>
                {name}
            </span>
            <br></br>
            <span className='name'>Total Balance:</span>
            <span className='balance-amount'>
                ${balance}
            </span>
        </div>
            <i className='fa-solid fa-piggy-bank piggy'></i>
            <button value={account_id} onClick={handleDelete} 
            className='acct--btn'>X</button>
    </div>
    </div>
  )
}

export default AccountCard