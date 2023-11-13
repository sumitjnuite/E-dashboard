import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem('user')
  // ise signup wale page me useeffect ke andar likho aur navigate krao...agar aisa nahi kroge to url me /signup likhne pr register hone ke bawjood pahuch jaoge....

  const handleLogout = () => {
    localStorage.removeItem('user');
    // navigate('/login')
  }

  return (
    <div>
      <img src="https://png.pngtree.com/template/20210709/ourmid/pngtree-shopping-logo-design-image_545854.jpg" alt="logo" className='logo'/>
      {auth ? <ul className='nav-ul'>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add'>Add Product</Link></li>
        <li><Link to='/update'>Update Product</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/login' onClick={handleLogout}>Logout</Link></li>
      </ul>
        :
        <ul className='nav-ul'>
          <li><Link to='/signup'>SignUp</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      }

    </div>
  )
}

export default Navbar
