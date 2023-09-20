// import React, { useState, useEffect } from 'react'
// import { useCurrentUser } from "../../CurrentUserContext"

// const AddIncomeToAcc = () => {
    
//     const { user } = useCurrentUser()
//     const [allTransactions, setAllTransactions] = useState([])
//     const [selectedAccount, setSelectedAccount] = useState([])

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
//     // console.log(filteredTransactionsByUser)
      

//     useEffect(() => {
//         fetch("/accounts/1")
//         .then(response => response.json())
//         .then(data => {setSelectedAccount(data)})
//         .catch(error => {
//             console.error('Error fetching transactions:', error);
//         });
//       }, []);
      
//     console.log(selectedAccount)
    // function handleAccount(){
    //     if formik.values.type === 'Income'{
    //         filteredTransactionsByUser
    
    //     }
    // }
    // validationSchema: formSchema,
    //   onSubmit: () => {
    //       fetch(`/accounts/${formik.values.account}`, {
    //           method: "PATCH",
    //           headers: {
    //               "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //              if formik.values.type === 'Income'{
    //                  "amount": (amount + formik.values.amount)
    //              }else{
    //                  "amount": (amount - formik.values.amount)
    //              }
    //       }).then((resp) => {
    //           if (resp.status === 201) {
    //             resp.json()
    //             console.log("Account Balance Updated")
    //         }
    
    //   }

    // fetch(`/accounts/${formik.values.account}`, {
    //     method: "GET", 
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })
    // .then((response) => {response.json()})
    // .then((accountData) => {
    //     let updatedBalance;

    //     if (formik.values.type === 'Income') {
    //         updatedBalance = accountData.amount + formik.values.amount;
    //     } else {
    //         updatedBalance = accountData.amount - formik.values.amount;
    //     }

    //     // Now, send a PATCH request to update the balance
    //     return fetch(`/accounts/${formik.values.account}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             "amount": updatedBalance,
    //         }),
    //     });
    // })
    // .then((response) => {
    //     if (response.ok) {
    //         response.json().then((user) => setUser(user));
    //         console.log("Account Balance Updated");
    //     }
    // })
    
//   return (
//     <div></div>
//   )
// }

// export default AddIncomeToAcc