import { Routes, Route } from "react-router-dom";

import Intro from './components/UserAccount/Intro.js'
import Login from './components/UserAccount/Login.js'
import CreateNewUser from './components/UserAccount/CreateNewUser.js'

import Main from './components/Layout/Main.js'
import Accounts from './components/Accounts/Accounts.js'
import Transactions from './components/Transactions/Transactions.js'
import Statistics from './components/Statistics/Statistics.js'

import { CurrentUserProvider } from "./CurrentUserContext"

function App() {
  return (
    <CurrentUserProvider>
      <Routes>
        <Route exact path='/' element={<Intro />} />
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/create" element={<CreateNewUser />}/>
        <Route exact path="/main" element={<Main />}/>
        <Route exact path="/main/accounts" element={<Accounts />}/>
        <Route exact path="/main/transactions" element={<Transactions />}/>
        <Route exact path="/main/statistics" element={<Statistics />}/>
      </Routes>
    </CurrentUserProvider>

  );
}

export default App;

