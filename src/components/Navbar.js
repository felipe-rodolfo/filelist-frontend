import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navContainer}>
                <div style={styles.navLinks}>
                    <NavLink to="/files" style={styles.navLink}>
                        Arquivos
                    </NavLink>
                    {token && (
                        <NavLink to="/upload" style={styles.navLink}>
                            Cadastrar Arquivos
                        </NavLink>
                    )}
                </div>
                <div style={styles.userActions}>
                    {user ? (
                        <>
                            <span style={styles.welcomeText}>Bem-vindo, {user.username}</span>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" style={styles.navLink}>
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        width: '100%',
        backgroundColor: '#333',
        padding: '10px 0',
        color: '#fff',
    },
    navContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'color 0.3s',
    },
    navLinkHover: {
        color: '#4CAF50',
    },
    userActions: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: '16px',
        color: '#fff',
    },
    logoutButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    logoutButtonHover: {
        backgroundColor: '#45a049',
    },
};

export default Navbar;
