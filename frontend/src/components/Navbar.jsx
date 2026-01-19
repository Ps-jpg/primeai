import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Theme State
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    // Apply Theme Effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="navbar-brand-icon">
                    {theme === 'dark' ? '🌙' : '☀️'}
                </span>
                <span>TaskHub</span>
            </Link>

            <div className="navbar-nav">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '1.2rem', padding: '0.4rem 0.8rem' }}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {isAuthenticated ? (
                    <>
                        <div className="navbar-user">
                            <div className="navbar-user-info">
                                <span className="navbar-user-name">{user?.name}</span>
                                <span className="navbar-user-role">{user?.role}</span>
                            </div>
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
