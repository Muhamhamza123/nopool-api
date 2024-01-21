// AuthService.js
import { toast } from 'react-toastify';

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const token = response.headers.get('Authorization');
        if (token) {
          console.log('Token:', token);
          localStorage.setItem('access_token', token);
        }
        toast.success('Login successful');
        return { success: true };
      } else if (response.status === 404) {
        toast.error('Invalid username or password.');
        return { success: false };
      } else if (response.status === 500) {
        toast.error('server error occurred.');
        return { success: false };
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage);
        return { success: false };
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return { success: false };
    }
  },
};

export default AuthService;