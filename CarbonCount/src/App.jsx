import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import EmissionInput from './pages/EmissionInput';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/input" element={<EmissionInput />} />
        <Route path="/history" element={<EmissionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
