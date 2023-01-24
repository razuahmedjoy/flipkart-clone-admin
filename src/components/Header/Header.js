import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions';

const Header = () => {
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()
    
    const logOut = ()=>{
        dispatch(signout())
    }

    return (
        <section className="fixed w-full top-0 left-0 right-0">
            <div className="navbar bg-slate-700 text-white rounded-none shadow-md w-full mx-auto md:px-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li tabIndex={0}>
                                <a className="justify-between">
                                    Parent
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a href="/" className="normal-case text-xl">Admin Dashboard</a>
                </div>

                {
                    auth.authenticate ?
                        <div className="navbar-end flex gap-2">
                            <span onClick={logOut} className="cursor-pointer">Sign Out</span>

                        </div>
                        :
                        <div className="navbar-end flex gap-2">
                            <Link className="" to="/signin">Signin</Link>
                            <Link className="" to="/signup">Signup</Link>
                        </div>
                }

            </div>
        </section>
    );
};

export default Header;