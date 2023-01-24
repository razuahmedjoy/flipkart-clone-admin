import axiosInstance from "../helpers/axios"
import { categoryContstants } from "./constants";

export const getAllCategory = () => {


    return async (dispatch) => {

        dispatch({
            type: categoryContstants.GET_ALL_CATEGORY_REQUEST
        })

        const res = await axiosInstance.get('category/getall');
        // console.log(res)
        if (res.status === 200) {
            const { categories } = res.data;

            dispatch({
                type: categoryContstants.GET_ALL_CATEGORY_SUCCESS,

                payload: { categories }
            })
        }
        else {
            dispatch({
                type: categoryContstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {

        dispatch({ type: categoryContstants.CATEGORY_CREATE_REQUEST });

        const res = await axiosInstance.post('/category/create', form);
        console.log(res);
        if (res.status === 201) {
            dispatch({
                type: categoryContstants.CATEGORY_CREATE_SUCCESS,
                payload: { category: res.data.category }
            })
        } else {
            dispatch({
                type: categoryContstants.CATEGORY_CREATE_FAILURE,
                payload: res.data.error
            })
        }
    }
}