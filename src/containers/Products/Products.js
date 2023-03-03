import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';

const Products = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [productPictures, setProductPictures] = useState([]);

    const { categories } = useSelector(state => state.category);
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

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

    const handleProductPictures = (e) => {

        setProductPictures([
            ...e.target.files
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', category);
        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form))
        console.log(form)

    }

    // console.log(productPictures)

    const renderProducts = () => {
        return (
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Product Pictures</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ?
                                products.map(product => (
                                    <tr key={product._id}>
                                        <th>1</th>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.category.name}</td>
                                        <td></td>
                                    </tr>))
                                : null
                        }
                    </tbody>

                </table>
            </div>
        )
    }

    return (
        <Layout sidebar>
            <div className="container">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-3xl">Products</h3>
                        <label htmlFor="product-Modal" className="btn btn-sm rounded-none">Add</label>
                    </div>
                </div>

                <div className='my-5'>
                    {renderProducts()}

                </div>



            </div>

            {/* modal for adding products */}
            <Modal
                modalId="product-Modal"
                modalTitle="Add Product"
                handleSubmit={handleSubmit}

            >
                <Input
                    label="Product Name"
                    value={name}
                    placeholder="Category Name"
                    onChange={(e) => setName(e.target.value)}

                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder="quantity"
                    onChange={(e) => setQuantity(e.target.value)}

                />
                <Input
                    label="Price"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}

                />
                <Input
                    label="Description"
                    value={description}

                    onChange={(e) => setDescription(e.target.value)}

                />

                <select
                    className="select select-bordered w-full rounded-none my-2 mb-4"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option>Select Category</option>
                    {
                        createCategoryList(categories).map(option => (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        ))
                    }

                </select>

                <input multiple className="mb-4 mt-2" type="file" name='productPicture' onChange={handleProductPictures} />

                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <br />
            </Modal>
        </Layout>
    );
};

export default Products;