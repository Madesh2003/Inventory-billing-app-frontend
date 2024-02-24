import React,{useContext} from 'react';
import InvoiceData from './Pages/InvoiceData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GenerateInvoice from './Pages/GenerateInvoice';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NotFound from './Pages/Pagenotfound';
import { AuthContext } from './Components/Contexts/AuthContext';

function App() {

  const { isLoggedIn } = useContext(AuthContext);


  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route element={<Login />} path='/' />
            <Route element={<Signup />} path='/signup' />
          </>
        ) : (
          <>
            <Route element={<InvoiceData />} path='/invoices-data' />
            <Route element={<GenerateInvoice />} path='/create-invoice' />
          </>
        )}
        <Route element={<NotFound />} path='*' />
      </Routes>

    </Router>
  );
}

export default App;
