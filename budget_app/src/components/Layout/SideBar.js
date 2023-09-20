import React from 'react'

const SideBar = () => {

    const handleLogOut = () => {
        fetch("/logout", {
            method: "POST",
            credentials: "include"
        })
    }

return (

    <div className='sidebar' >
        <div className='blank'></div>
        <ul className='menu'>
            <li className='active'>
                <a href='/main'>
                    <i className='fas fa-tachometer-alt'></i>
                    <span>&nbsp;Dashboard</span>
                </a>
            </li>
            <li>
                <a href='/main/accounts'>
                    <i className="fa-solid fa-user"></i>
                    <span>&nbsp;&nbsp;Accounts</span>
                </a>
            </li>
            <li>
                <a href='/main/transactions'>
                    <i className='fa-solid fa-money-bill-transfer'></i>
                    <span>Transactions</span>
                </a>
            </li>
            <li>
                <a href='/main/statistics'>
                    <i className="fa-solid fa-chart-pie"></i>
                    <span>&nbsp;Statistics</span>
                </a>
            </li>
            <li className='logout'>
                <a href='/' onClick={handleLogOut}>
                    <i className='fas fa-sign-out-alt'></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </div>
)
}

export default SideBar