import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = (props) => {
    return (
        <>
            <Header />

            <div className="py-16">

                {
                    props.sidebar ?
                        <div className="grid grid-cols-12 min-h-screen">
                            <div className="col-span-2 bg-[#eee] shadow-md">
                                <ul className="flex flex-col gap-y-2 ml-4 pt-2">
                                    <li>
                                        <NavLink className="sidemenu-btn" to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="sidemenu-btn" to="/category">Category</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="sidemenu-btn" to="/products">Products</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="sidemenu-btn" to="/orders">Orders</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-span-10 p-5">
                                {props.children}
                            </div>
                        </div>
                        :
                        props.children


                }
            </div>



        </>
    );
};

export default Layout;