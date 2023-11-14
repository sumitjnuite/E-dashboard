import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:4000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:4000/products/${id}`, {
            method: 'DELETE',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    // search product
    const searchProduct = async (e) => {
        let key = e.target.value;
        // console.log(key)
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setProducts(result)
        }else{
            getProducts();
        }



        // console.log(result)
    }


    return (
        <div className='product-list'>
            <h1 className='registerHeading'>Products</h1>
            <input type="text" placeholder='Search Product' className='inputBox' onChange={searchProduct} />

            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li><button type='button' onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={'/update/' + item._id}>Update</Link>
                        </li>

                    </ul>
                ): <h1>No Result Found</h1>

            }


        </div>
    )
}

export default ProductList
