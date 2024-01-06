import React, { useEffect, useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { toast } from 'react-toastify'
import ShoppingCart from '../../components/ShoppingCart'
import Details from '../../components/Details'
import { useRouter } from 'next/router'



function CheckOut(props) {

    const [userDetail, setUserDetail] = useState(props.userData)
    const [userOrders, setUserOrders] = useState({})
    const [startSubmit, setStartSubmit] = useState(2)
    const [productStatus, setProductStatus] = useState(2)
    const [clearCart, setClearCart] = useState(false)
    const [pinCodeData, setPinCodeData] = useState([])
    const [InvalidPin, setInvalidPin] = useState(false)
    const router = useRouter()

    const checkOutOrder = async (data) => {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/addOrder/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        let msg = await response.text()

        if (response.status === 200) {
            toast.success(JSON.stringify(msg), { autoClose: 1000 })
        } else {
            toast.error(msg)

        }
        if (response.status === 200 || response.status === 403) {
            setClearCart(true)

            if (response.status === 200) {
                setTimeout(() => {
                    router.push("/order/Order")
                }, 800);
            }

        } else if (response.status === 401) {
            localStorage.clear()

            setTimeout(() => {
                location.reload()
            }, 1000);
        }
    }


    const fetchPinCodes = async () => {
        let pindata = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/Pincode?type=full`);
        let data = await pindata.json()
        setPinCodeData(data)
    }

    const pinchange = (e) => {

        if (pinCodeData.length === 0) {
            fetchPinCodes()
        }


        for (const key in pinCodeData) {
            if ((key) === e.target.value) {
                if (pinCodeData[key][0] !== "" && pinCodeData[key][1] !== "") {
                    setUserDetail({ ...userDetail, city: pinCodeData[key][0], state: pinCodeData[key][1], pin: parseInt(e.target.value) })
                }
            }
        }


        if (Object.keys(pinCodeData).includes(e.target.value)) {
            setInvalidPin(false)
        } else {
            setInvalidPin(true)
        }
    }

    useEffect(() => {

        if (typeof window !== 'undefined') {

            let token = JSON.parse(localStorage.getItem('defaultToken'))
            let data = { token, ...userDetail, ...userOrders, paymentInfo: "none", orderId: Date.now() }

            if (startSubmit === 0 && productStatus === 0) {
                if (InvalidPin) {
                    toast.error("Pincode is not serviceable")
                } else {
                    checkOutOrder(data)
                    setStartSubmit(2)
                    setProductStatus(2)
                }

            }
        }
    }, [startSubmit, productStatus])




    const onSubmit = () => {
        setStartSubmit(1)
    }







    return (
        <>
            {
                !props.isLogin ? <>

                    <div className='m-3 flex justify-center text-xl items-center '>
                        <div>Login First</div>
                        <button onClick={() => { document.getElementById('userLogin').click() }} className={` bg-indigo-500 border-0 py-2 px-3 mx-2 md:mx-7 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Log In"> <AiOutlineLogin /> </button>
                    </div>

                </> : <>

                    <div className=" my-9 text-sm w-full mb-32 bg-indigo-200 p-3">
                        <div className="text-xl text-center m-3">CheckOut </div>
                        <div className='bg-indigo-300 rounded-lg p-2 w-full md:flex md:justify-around md:flex-wrap text-sm'>
                            <Details userDetail={userDetail} setUserDetail={setUserDetail} checkOut={{ startSubmit: startSubmit, setStartSubmit: setStartSubmit, onpinchange: pinchange }} />
                        </div>

                        {/* REVIEW AND PAY */}
                        <ShoppingCart isLogin={props.isLogin} notAllow={true} submit={onSubmit} setUserOrders={setUserOrders} setProductStatus={setProductStatus} clearCart={clearCart} setClearCart={setClearCart} />

                    </div >

                </>
            }
        </>
    )
}

export default CheckOut