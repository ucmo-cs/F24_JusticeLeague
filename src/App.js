import Header from './components/Header';
import Header2 from './components/Header2';
import LoginHeader from './components/LoginHeader';
import { Route, Routes, useLocation, matchPath } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import LoginForm from './pages/LoginForm';
import LoanInfo from './pages/loan_info';
import Info from './pages/Info';

function App() {
  const location = useLocation();

  // Determine which header to display based on login
  const renderHeader = () => {
    const currentPath = location.pathname;
  
    if (currentPath === "/") return <LoginHeader />;
    
    {/* admin header */}
    if (["/loanForm", "/loan"].includes(currentPath)) return <Header />;
    if (matchPath("/loanInfo/:loanId/:accountId", currentPath)) return <Header />;
    {/* customer header */}
    if (matchPath("/customer/:userId", currentPath)) return <Header />;
    if (matchPath("/info/:userId", currentPath)) return <Header />;
  };
  

  return (
    <div>
      {renderHeader()}

      <Routes>
      <Route path="/" exact={true} element={<LoginForm />} />
          <Route path="/loanForm" exact={true} element={<SaveLoan />} />  
          <Route path="/loan" exact={true} element={<Loan_bk />} />
          <Route path="/customer/:userId" exact={true} element={<Customer />} />
          <Route path="/loanInfo/:loanId/:accountId" element={<LoanInfo />} /> {/* Use accountId */}
          <Route path='/info/:userId' exact={true} element={<Info/>}/>

      </Routes>
    </div>
  );
}

export default App;