import Header from './components/Header';
import Header2 from './components/header2';
import { Route, Routes, useLocation } from 'react-router-dom';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import LoginForm from './pages/LoginForm';
import LoanInfo from './pages/loan_info';

function App() {
  const location = useLocation();

  // Determine which header to display based on the current route
  const renderHeader = () => {
    if (location.pathname === "/") return null; // No header for LoginForm
    if (["/loanForm", "/loan", "/loanInfo/:accountId"].includes(location.pathname)) return <Header />;
    if (location.pathname === "/customer") return <Header2 />;
  };
  return (
      <div>
      {renderHeader()}
        <Routes>
          <Route path="/" exact={true} element={<LoginForm />} />
          <Route path="/loanForm" exact={true} element={<SaveLoan />} />  
          <Route path="/loan" exact={true} element={<Loan_bk />} />
          <Route path="/customer" exact={true} element={<Customer />} />
          <Route path="/loanInfo/:accountId" element={<LoanInfo />} /> {/* Use accountId */}
        </Routes>
      </div>
  );
}

export default App;
