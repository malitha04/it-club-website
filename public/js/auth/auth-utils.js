// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Get current user data
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Get auth token
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
};

// Make authenticated API requests
export const authFetch = async (url, options = {}) => {
    const token = getAuthToken();
    
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {})
    };
    
    try {
        const response = await fetch(`/api${url}`, {
            ...options,
            headers
        });
        
        // If unauthorized, redirect to login
        if (response.status === 401) {
            logout();
            return null;
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};
