import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const handleProductDetails = async () => {

        // agar koi bhi ek field khali hai tab
        // console.warn(!name)
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        } else {

            // return false; // ab iske neeche ka code nahi run hoga
            const userID = JSON.parse(localStorage.getItem('user'))._id;
            console.log(name, price, category, company, userID)

            let result = await fetch('http://localhost:4000/add-product', {
                method: 'POST',
                body: JSON.stringify({ name, price, category, company, userID }),
                headers: {
                    'Content-type': 'application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })

            result = await result.json();

            if (result) {
                console.log(result)
            } else {
                alert("ERROR:Product Not added")
            }
        }
    }

    return (
        <div>
            <h1 className='registerHeading'>Enter Product Details</h1>
            <div className='inputWrapper'>
                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter product name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                {error && !name && <span className='errorText'>Enter valid name</span>}
            </div>
            <div className='inputWrapper'>
                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                {error && !price && <span className='errorText'>Enter valid price</span>}
            </div>
            <div className='inputWrapper'>
                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} />
                {error && !category && <span className='errorText'>Enter valid category</span>}
            </div>
            <div className='inputWrapper'>

                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)} />
                {error && !company && <span className='errorText'>Enter valid company</span>}
            </div>


            <button className='signupbtn' type='button' onClick={handleProductDetails}>Add Product</button>
        </div>
    )
}

export default AddProduct;
