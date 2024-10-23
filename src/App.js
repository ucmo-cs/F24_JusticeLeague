import Header from './components/Header';
import { Route, Router, Routes } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import LoginForm from './pages/LoginForm';




function App() {
  return (
      <div>
        <Header/>
        <Routes>
          <Route path="/loanForm" exact={true} element={<SaveLoan/>}/>  
          <Route path="/loan" exact={true} element={<Loan_bk/>}/>
          <Route path="/customer" exact={true} element={<Customer/>}/>
        </Routes>
        <LoginForm/>
      </div>
  );
}


export default App;
