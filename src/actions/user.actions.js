import axiosInstance from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {

    // console.log(user);

    return async (dispatch) => {

        dispatch({ type: userConstants.USER_REGISTER_REQUEST });

        const res = await axiosInstance.post(`/admin/signup`, {
            ...user
        })
        console.log(res)

        if (res.status === 201) {
            const { message } = res.data;
            // localStorage.setItem('token', token);
            // localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        }
        else {
            console.log(res)
            if (res.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }

        }


    }
    // return {

    //     type: authConstants.LOGIN_REQUEST,
    //     payload: {
    //         ...user
    //     }

    // }
}
