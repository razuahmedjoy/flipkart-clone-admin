
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getAllCategory, isUserLoggedIn } from './actions';
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import Layout from './components/Layout';
import Category from './containers/Category/Category';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';
import Products from './containers/Products/Products';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {

    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

    dispatch(getAllCategory());


  }, [])


  return (
    <div className="App">

      <Routes>

        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="category" element={<Category />}></Route>
        </Route>

        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>

    </div>
  );
}

export default App;
