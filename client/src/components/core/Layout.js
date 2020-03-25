import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Layout ({ children, history }) {
    return (
        <div>
            <div className="header">
                <div className="header_items">
                    <Link className="heading" to="/">task.ist</Link>
                    
                    <ul className="list">

                        {!isAuth() && (
                            <>
                                <NavLink style={{ color: '#fff', }} activeStyle={{ color: '#ff0', fontWeight: 'bold', }} to="/signup">
                                    <li className="login_button">Signup</li>
                                </NavLink>

                                <NavLink style={{ color: '#fff', }} activeStyle={{ color: '#ff0', fontWeight: 'bold', }} to="/signin">
                                    <li className="login_button">Signin</li>
                                </NavLink>
                            </>
                        )}

                        {isAuth() && isAuth().role === 'admin' && (
                            <NavLink 
                                style={{ color: '#fff', }} 
                                activeStyle={{ color: '#ff0', fontWeight: 'bold', }} 
                                to="/admin">
                                    <li className="login_button">{isAuth().name}</li>
                            </NavLink>
                        )}

                        {isAuth() && isAuth().role === 'subscriber' && (
                            <NavLink 
                                style={{ color: '#fff', }} 
                                activeStyle={{ color: '#ff0', fontWeight: 'bold', }} 
                                to="/private">
                                    <li className="login_button">{isAuth().name}</li>
                            </NavLink>
                        )}
                        
                        {isAuth() && (
                            <li className="login_button" style={{ backgroundColor: 'indianred', cursor: 'pointer', border: '1px solid indianred' }}>
                                <span
                                    style={{ color: '#fff', cursor: 'pointer' }}
                                    onClick={() => signout(() => history.push('/'))}
                                >Signout</span>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="divider">
                    <div className="dark"></div>
                    <div className="light"></div>
                </div>
            </div>
            
            <div className="App">
                <ToastContainer 
                    position={toast.POSITION.BOTTOM_RIGHT}
                    autoClose={3000}
                    transition={Slide}
                    pauseOnFocusLoss={false}
                />

                {children}
            </div>  
        </div>
    )
}

export default withRouter(Layout);