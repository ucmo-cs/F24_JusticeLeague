import Header from './components/Header';
import Header2 from './components/Header2';
import LoginHeader from './components/LoginHeader';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import LoginForm from './pages/LoginForm';
import LoanInfo from './pages/loan_info';
import Info from './pages/Info';

function App() {
  const location = useLocation();

  //determine which header to display based on login
  const renderHeader = () => {
    if(location.pathname === "/") return <LoginHeader />;
    if(["/loanForm","/loan","/loanInfo/:accountId"].includes(location.pathname)) return <Header />;
    if (location.pathname === "/customer/:userId") return <Header2 />;
  }
  return (
      <div>
        {renderHeader()}
        
        <Routes>
          <Route path="/" exact={true} element={<LoginForm />} />
          <Route path="/loanForm" exact={true} element={<SaveLoan />} />  
          <Route path="/loan" exact={true} element={<Loan_bk />} />
          <Route path="/customer/:userId" exact={true} element={<Customer />} />
          <Route path="/loanInfo/:accountId" element={<LoanInfo />} /> {/* Use accountId */}
          <Route path='/info/:userId' exact={true} element={<Info/>}/>
        </Routes>
      </div>
  );
}

export default App;
