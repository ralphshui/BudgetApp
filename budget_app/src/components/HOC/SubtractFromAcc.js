// import React, { useState, useEffect } from 'react'
// import { useCurrentUser } from "../../CurrentUserContext"

// const SubtractFromAcc = () => {
    
//     const { user } = useCurrentUser()

//     onSubmit: () => {
//         const date = formik.values.date.toLocaleDateString()

//         fetch(`http://127.0.0.1:5555/transactions`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 "account_id": formik.values.account,
//                 "description": formik.values.description,
//                 "type": formik.values.type,
//                 "amount": formik.values.amount,
//                 "date": date,
//                 "category": formik.values.category
//             }),
            
//         }).then((resp) => {
//             if (resp.status === 201) {
//                 resp.json()
//                 console.log("Transaction created")
//             }
//         })
//         return fetch(`/accounts/${formik.values.account}`, {
//                  method: "GET", 
//                  headers: {
//                     "Content-Type": "application/json",
//                  },
//                 })
//                 .then((response) => response.json())
//                 .then((accountData) => {
//                     let updatedBalance;

//                     if (formik.values.type === 'Income') {
//                         updatedBalance = accountData.amount + formik.values.amount;
//                     } else {
//                         updatedBalance = accountData.amount - formik.values.amount;
//                     }
//                 })
//         return fetch(`/accounts/${formik.values.account}`, {
//                     method: "PATCH",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         "amount": updatedBalance,
//                     }),
//                 }).then((resp) => {
//                         if (resp.status === 201) {
//                             resp.json()
//                             console.log("Account Balance Updated")
//                         })
//             }.then(()=> window.location.reload(true))
// //     
// // }
//     return (
//         <div></div>
//     )
// }

// export default SubtractFromAcc

// validationSchema: formSchema,
// onSubmit: () => {
//     const date = formik.values.date.toLocaleDateString()

//     fetch(`http://127.0.0.1:5555/transactions`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             "account_id": formik.values.account,
//             "description": formik.values.description,
//             "type": formik.values.type,
//             "amount": formik.values.amount,
//             "date": date,
//             "category": formik.values.category
//         }),
        
//     }).then((resp) => {
//         if (resp.status === 201) {
//             resp.json()
//             console.log("Transaction created")
//         }
//     }).then(()=> window.location.reload(true))
// }
// })