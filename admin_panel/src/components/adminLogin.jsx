// Import necessary React components and hooks
import { useState } from 'react';
import '../css/adminLogin.css'

// Define the Login component
const AdminLogin = () => {
  // State to store user credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (username === 'admin' && password === 'password') {
      // Successful login (in a real application, you would perform authentication here)
      console.log('Login successful!');
      location.href="/adminPanel"
    } else {
      // Failed login
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login-btn' type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Export the Login component
export default AdminLogin;
