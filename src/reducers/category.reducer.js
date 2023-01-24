import { authConstants, categoryContstants } from "../actions/constants";


const initialState = {
    categories: [],
    loading: false,
    error: null,
}


const buildNewCategories = (parentId, categories, newCategory) => {
    let _categories = []
    for (let cat of categories) {

        if (cat._id === parentId) {
            _categories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId, [
                    ...cat.children,
                    {
                        _id: newCategory._id,
                        name: newCategory.name,
                        slug: newCategory.slug,
                        parentId: newCategory.parentId,
                        children: newCategory.children

                    }
                ], newCategory) : [{
                    _id: newCategory._id,
                    name: newCategory.name,
                    slug: newCategory.slug,
                    parentId: newCategory.parentId,
                    children: newCategory.children || []

                }]
            })
        } else {

            _categories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId, cat.children, newCategory) : []
            })

        }

    }

    return _categories;
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case categoryContstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }

            break;
        case categoryContstants.GET_ALL_CATEGORY_SUCCESS:


            state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }

            break;
        case categoryContstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }

            break;

        case categoryContstants.CATEGORY_CREATE_REQUEST:
            state = {
                ...state,
                loading: true
            }

            break;
        case categoryContstants.CATEGORY_CREATE_SUCCESS:
            const category = action.payload.category
            const updatedCategories = buildNewCategories(category.parentId, state.categories, action.payload.category);
            console.log(updatedCategories);

            state = {
                ...state,
                categories: updatedCategories,
                loading: false,

            }

            break;
        case categoryContstants.CATEGORY_CREATE_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }

            break;
        default:


    }

    return state;
}

export default categoryReducer;