// import React, { useState, useEffect } from 'react'
// import { useCurrentUser } from "../../CurrentUserContext"

// const FilterTransByUser = ({ children }) => {
//     const { user } = useCurrentUser()
//     const [allTransactions, setAllTransactions] = useState([])

//     useEffect(() => {
//         fetch("/transactions")
//         .then(response => response.json())
//         .then(data => {setAllTransactions(data)})
//         .catch(error => {
//             console.error('Error fetching transactions:', error);
//         });
//       }, []);
      
//       const filteredTransactionsByUser = allTransactions.filter(transaction => {
//         const user_id = transaction.account.user.id;
//         return user_id === user?.id;
//       });
  

//   return (
//       <>{children(filteredTransactionsByUser)}</>
//   )
// }

// export default FilterTransByUser  
// console.log(filteredTransactionsByUser)