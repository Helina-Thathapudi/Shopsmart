import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { Component } = props
    const navigate = useNavigate()
    useEffect(() => {
        const token = Cookies.get('jwtToken')
        const adminToken = Cookies.get('adminJwtToken')
        if (!token) {
            navigate('/login')
        }
    })
    return <Component />

};

export default ProtectedRoute;
