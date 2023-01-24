import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signup } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input/Input';

const Signup = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    // handlers
    const userSignUp = (e) => {
        e.preventDefault()

        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))

    }


    if (auth.authenticate) {
        return <Navigate to="/" />
    }
    if(user.loading){
        return <p>Loading...!</p>
    }

    return (
        <Layout>

            <div className="max-w-xl mx-auto p-5 m-20">
                <div className="border p-2 rounded shadow-md">
                    <h2 className="text-center text-2xl font-semibold">Sign up</h2>
                    <form onSubmit={userSignUp}>
                        <div className="p-4">
                            <Input
                                label="First Name"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                label="Last Name"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="test@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />



                            <br />
                            <div className="form-control w-full rounded-none">

                                <input type="submit" className="input input-bordered w-full rounded-none cursor-pointer btn text-teal-600" value="Sign up"/>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    );
};

export default Signup;