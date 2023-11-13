import React,{useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const UpdateProduct = () => {
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const params =  useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetail();
        console.log(params.id)

    },[])


    const getProductDetail = async () =>{
        // parameter se id lenge aur us id wale product ko find krenge--

        let prodDetails  = await fetch(`http://localhost:4000/product/${params.id}`,{
            method:"GET"
        });
        prodDetails =await prodDetails.json();
        console.log(prodDetails)

        setName(prodDetails.name);
        setPrice(prodDetails.price)
        setCategory(prodDetails.category)
        setCompany(prodDetails.company);

    }

    const updateProduct =async () =>{
        let result = await fetch(`http://localhost:4000/product/${params.id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "Content-type":"application/json"
            }
        })

        result = await result.json();
        if(result){
            navigate('/');
        }

    }

    return (
        <div>
            <h1 className='registerHeading'>Update Product Details</h1>
            <div className='inputWrapper'>
                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter product name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className='inputWrapper'>
                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className='inputWrapper'>
                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} />

            </div>
            <div className='inputWrapper'>

                <input
                    className='inputBox'
                    type="text"
                    placeholder='Enter company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)} />

            </div>


            <button className='signupbtn' type='button' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct
