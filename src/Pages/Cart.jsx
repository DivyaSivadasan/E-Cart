import { faBackwardStep, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeCartItem } from '../redux/slices/cartSlice'


function Cart() {

  const [total, setTotal] = useState()

  const cartArray = useSelector((state) => state.cartItem)
  console.log(cartArray);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const getTotal = () => {
    if (cartArray.length > 0) {
     setTotal (cartArray?.map((item) => item.price)?.reduce((n1, n2) => n1 + n2))
    }
  }

  const handleCheckOut = () =>{
    alert("Order Placed Successfully")
    dispatch(emptyCart())
    navigate('/')
  }

  useEffect(() => {
    getTotal()
  }, [cartArray])


  return (
    <>
      <h1 className='pt-32  text-center text-violet-600 text-5xl'>Cart</h1>
      {cartArray?.length > 0 ?
        <div className='md:grid grid-cols-[2fr_1fr] m-10'>

          <div className='p-3'>
            <table className='w-full border border-gray-700 shadow-lg'>
              <thead>
                <tr>
                  <th className='border border-gray-100 p-3 bg-violet-700 text-white'>#</th>
                  <th className='border border-gray-100 p-3 bg-violet-700 text-white'>Title</th>
                  <th className='border border-gray-100 p-3 bg-violet-700 text-white'>Image</th>
                  <th className='border border-gray-100 p-3 bg-violet-700 text-white'>Price</th>
                  <th className='border border-gray-100 p-3 bg-violet-700 text-white'>Action</th>
                </tr>

              </thead>
              <tbody>
                {cartArray?.map((item, index) => (
                  <tr>
                    <td className='border border-gray-200 text-center'>{index + 1}</td>
                    <td className='border border-gray-200 text-center'>{item.title}</td>
                    <td className='border border-gray-200 text-center flex justify-center py-5 '><img src={item.image} alt="no image" style={{ width: "150px", height: "100px" }} /></td>
                    <td className='border border-gray-200 text-center'>$ {item.price}</td>
                    <td className='border border-gray-200 text-center'><button onClick={() => dispatch(removeCartItem(item?.id))} className='bg-red-700 px-5 py-3 rounded text-white hover:border hover:bg-transparent hover:border-red-700 hover:text-red-700'><FontAwesomeIcon icon={faTrash} /></button></td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>

          <div className='pt-5 px-10'>
            <div className='shadow-lg p-5'>
              <h1 className='text-4xl text-center py-2'>Cart Summary</h1>
              <p className='mt-5 text-xl'>Total number of products : {cartArray.length}</p>
              <p className='mt-3 text-xl'>Grand Total : <span>$ {total} </span></p>
              <button onClick={handleCheckOut} className='w-full bg-green-600 p-3 text-white mt-5 hover:border hover:bg-transparent hover:border-green-600 hover:text-green-600'>Check Out</button>
            </div>
          </div>
        </div>
        :
        <div className='w-full pt-0 md:grid grid-cols-3'>
          <div></div>
          <div>
            <img src="https://aleointernational.com/img/empty-cart-yellow.png" alt="no image" className='w-full h-auto my-5' />
            <div className='text-center mb-5'>
              <Link to={'/'}><button className=' bg-green-600 p-3 text-white mt-5 hover:border hover:bg-transparent hover:border-green-600 hover:text-green-600 rounded'><FontAwesomeIcon icon={faBackwardStep} className='me-2' />Back Home</button></Link>
            </div>
          </div>
          <div></div>
        </div>}


    </>
  )
}

export default Cart