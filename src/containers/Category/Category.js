import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';

const Category = () => {

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    const category = useSelector(state => state.category);

    const dispatch = useDispatch();



    const renderCategories = (categories) => {

        let _categories = [];

        for (let category of categories) {
            _categories.push(
                <li key={category._id}>
                    {category.name}
                    {
                        category.children.length > 0
                            ?
                            (<ul className="ml-5">
                                {renderCategories(category.children)}
                            </ul>)
                            :
                            null
                    }
                </li>
            )
        }
        // console.log(_categories)
        return _categories

    }

    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;

    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append('name', categoryName);
        form.append('categoryImage', categoryImage);
        form.append('parentId', parentCategoryId);

        dispatch(addCategory(form))


    }

    return (
        <Layout sidebar>
            <div className="container">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-3xl">Category</h3>
                        <label htmlFor="addCategory" className="btn btn-sm rounded-none">Add</label>
                    </div>
                </div>

                <div>
                    <ul>
                        {
                            renderCategories(category.categories)

                        }
                        {

                        }
                    </ul>



                </div>
            </div>





            <Modal
                modalId="addCategory"
                handleSubmit={handleSubmit}
                modalTitle="Add New Category"

            >
                <Input
                    label="Category Name"
                    value={categoryName}
                    placeholder="Category Name"
                    onChange={(e) => setCategoryName(e.target.value)}

                />

                <select
                    className="select select-bordered w-full rounded-none"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    
                    {
                        createCategoryList(category.categories).map(option => (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        ))
                    }

                </select>

                <br />
                <Input
                    type="file"
                    label="Category Image"
                    class="input w-full rounded-none -ml-3"
                    onChange={handleCategoryImage}
                />

            </Modal>
        </Layout>
    );
};

export default Category;