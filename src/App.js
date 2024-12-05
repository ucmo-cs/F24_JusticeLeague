import Header from './components/Header';

import { Route, Routes} from 'react-router-dom';

import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import LoginForm from './pages/LoginForm';
import LoanInfo from './pages/loan_info';
import Info from './pages/Info';

function App() {
  
 
  return (
      <div>
        <Header />
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
