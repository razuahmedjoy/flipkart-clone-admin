import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
    const token = localStorage.getItem('token');
    if(token){
        return <Outlet/>;
    }
    else{
        return <Navigate to="/signin"/>
    }
};

export default PrivateRoute;