import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi'
import Link from 'next/link'
import Userprofile from './Userprofile'
import ShoppingCart from './ShoppingCart'
import { useRouter } from 'next/router'
import UserAuth from './UserAuth'


function Navbar(props) {

    // USER AUTHENTICATION RELATED STUFF
    const userAuth = useRef()
    const userLogin = () => {
        if (userAuth.current.classList.contains('translate-x-full')) {
            userAuth.current.classList.remove('translate-x-full')
            userAuth.current.classList.add('translate-x-0')
            if (!Cart.current.classList.contains('translate-x-full')) {
                Cart.current.classList.remove('translate-x-0')
                Cart.current.classList.add('translate-x-full')
            }
        } else {
            userAuth.current.classList.remove('translate-x-0')
            userAuth.current.classList.add('translate-x-full')
        }
    }


    // SHOPPING CART RELATED STUFF
    const Cart = useRef()
    const router = useRouter()
    const [cartRefresh, setCartRefresh] = useState(false)
    const cartAvailable = ["/order/CheckOut", "/order/Order", "/order/Trace", "/"]

    const cartBtn = () => {
        if (Cart.current.classList.contains('translate-x-full')) {
            Cart.current.classList.remove('translate-x-full')
            Cart.current.classList.add('translate-x-0')
            if (!userAuth.current.classList.contains('translate-x-full')) {
                userAuth.current.classList.remove('translate-x-0')
                userAuth.current.classList.add('translate-x-full')
            }
            setCartRefresh(true)
        } else {
            Cart.current.classList.remove('translate-x-0')
            Cart.current.classList.add('translate-x-full')
            setCartRefresh(false)
        }
    }


    // ROUTER STUFF
    useEffect(() => {
        if (!Cart.current.classList.contains('translate-x-full' )) {
            Cart.current.classList.remove('translate-x-0')
            Cart.current.classList.add('translate-x-full')
        }else if(!userAuth.current.classList.contains('translate-x-full' )){
            userAuth.current.classList.remove('translate-x-0')
            userAuth.current.classList.add('translate-x-full')
        }
    }, [router.query])




    return (
        <>
            {/* NAVBAR PAGE */}
            <div className="text-sm md:text-2xl">
                <div className=' flex flex-wrap justify-between shadow  p-3 bg-slate-200 fixed z-10 w-full top-0 '>
                    <span className='flex justify-center mr-2 text-sm flex-wrap '>
                        <span className='mx-2 md:mr-10 text-sm '> <Link href={'/'}> Home</Link></span>
                        <span className='mx-2 md:mr-10 text-sm '> <Link href={'/Robots'}> Robots</Link></span>
                        <span className='mx-2 md:mr-10 text-sm '> <Link href={'/Pc'}> Pc</Link></span>
                        <span className='mx-2 md:mr-10 text-sm '> <Link href={'/Tools'}> Tools</Link></span>
                    </span>
                    <span className=' mr-2 text-xl cursor-pointer flex ' >
                        <span onClick={userLogin} > {props.isLogin ? <AiOutlineUser /> : <BiLogIn />}</span>
                        {!cartAvailable.includes(router.pathname) && <span className='ml-3' onClick={cartBtn} > <AiOutlineShoppingCart /></span>}
                    </span>
                </div>



                {/* USER AUTHENTICATION PAGE */}
                <div id='UserAuth' ref={userAuth} className='fixed transform transition-transform translate-x-full z-20 right-0 md:right-0 overflow-auto h-3/4 w-full md:w-1/2 lg:w-1/3 '>
                    {props.isLogin ? <Userprofile changeLoginState={props.setIsLogin} userData={props.userData} /> : <UserAuth changeLoginState={props.setIsLogin} />}
                </div>



                {/* SHOPPING CART PAGE */}
                <div ref={Cart} className=" fixed transform transition-transform  translate-x-full z-20 right-0 overflow-auto h-5/6 w-full md:w-2/3 lg:w-3/5">
                    <ShoppingCart isLogin={props.isLogin} Login={userLogin} hideCart={cartBtn} refresh={cartRefresh} />
                </div>


                <span id="userLogin" className='hidden' onClick={userLogin}></span>

            </div>
        </>
    )
}

export default Navbar
