import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input/Input';

import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()


   

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email,
            password
        }
        dispatch(login(user));
    }

    const setDemoCredentials = ()=>{
        setEmail("admin@gmail.com");
        setPassword("123456");
    }

    if (auth.authenticate) {
        return <Navigate to="/" />
    }

    return (
        <Layout>

            <div className="max-w-xl mx-auto p-5 m-20">
                <div className="border p-2 rounded shadow-md">
                    <h2 className="text-center text-2xl font-semibold">Login</h2>

                    <div className="p-4">
                        <form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="test@gmail.com"
                                value={email}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                required={true}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <br />
                            <div className="form-control w-full rounded-none">

                                <input type="submit" className="input input-bordered w-full rounded-none cursor-pointer btn text-teal-600" value="Login" />

                            </div>

                        </form>
                        <br />
                        <button onClick={setDemoCredentials} className="btn btn-sm rounded-none">Demo Admin Login</button>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Signin;