import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import SendPasswordResetEmail from './components/pages/auth/SendPasswordResetEmail';
import Login from './components/pages/auth/Login';
import Signup from './components/pages/auth/Signup';
import Dashboard from './components/pages/Dashboard';
import ResetPassword from './components/pages/auth/ResetPassword';
import DishDetail from './components/pages/DishDetails';
import NotFound from './components/NotFound';
import { useSelector } from 'react-redux';

function App() {
  const access_token = useSelector(state => state); // Assuming access_token is stored in state.auth
  console.log(access_token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={access_token ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="signup" element={<Signup />} />
          <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="dish/:id" element={<DishDetail/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
