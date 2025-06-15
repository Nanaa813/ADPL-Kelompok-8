import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import EmissionInput from './pages/EmissionInput';
import EmissionHistory from './pages/EmissionHistory';
import Layout from './components/layout'; 
import Tips from './pages/tips';
import Account from './pages/account';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<EmissionInput />} />
          <Route path="/history" element={<EmissionHistory />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
