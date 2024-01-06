import React, { useEffect, useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import Link from 'next/link'




function Order(props) {

    const [refreshState, setRefreshState] = useState(true)
    const [orderData, setOrderData] = useState([])

    const fetchOrders = async (data) => {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/getOrder/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data })
        })

        let msg = await response.json()
        setOrderData((msg))
    }


    useEffect(() => {

        if (typeof window !== 'undefined') {
            let data = JSON.parse(localStorage.getItem('defaultToken'))
            fetchOrders(data)
        }
        setRefreshState(false)

    }, [refreshState])



    return (
        <>
            <h3 className='text-lg md:text-2xl text-center mb-4 w-full'> Your Orders</h3>

            {
                !props.isLogin ? <>

                    <div className='m-3 flex justify-center text-xl items-center '>
                        <div>Login First</div>
                        <button onClick={() => { document.getElementById('userLogin').click() }} className={` bg-indigo-500 border-0 py-2 px-3 mx-2 md:mx-7 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Log In"> <AiOutlineLogin /> </button>
                    </div>

                </> : <>




                    <section className="text-gray-600 body-font w-full">
                        <div className="container py-14 m-auto w-full">
                            <div className="flex flex-wrap  min-w-[25rem] justify-evenly p-3 overflow-x-auto md:w-full">


                                {
                                    orderData && orderData.length === 0 ? "Nothing To Preview":
                                    orderData.map(items => {
                                        return (

                                            <Link href={`/order/Trace?id=${items._id}`} key={items._id} className="shadow-lg flex flex-col justify-evenly  min-w-[18rem] h-fit p-9 m-5 md:h-fit   overflow-x-auto border-2 " >

                                                <div className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between w-full my-3 ">
                                                    <b className='w-1/4 flex text-right '>Order Id</b> : <span className='w-2/4 text-left'>{items._id}</span>
                                                </div> <hr />
                                                <div className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between w-full my-3 ">
                                                    <b className='w-1/4 flex text-right'>Date</b> : <span className='w-2/4 text-left'>{JSON.stringify(Date(items.createdAt)).substring(5, 16)}</span>
                                                </div> <hr />
                                                <div className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between w-full my-3 ">
                                                    <b className='w-1/4 flex text-right'>Count</b> : <span className='w-2/4 text-left'>{items.products.length}</span>
                                                </div> <hr />
                                                <div className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between w-full my-3 ">
                                                    <b className='w-1/4 flex text-right'>Price</b> : <span className='w-2/4 text-left'>{items.total}</span>
                                                </div> <hr />
                                                <div className="text-gray-500 text-xs tracking-widest title-font mb-1 flex justify-between w-full my-3 ">
                                                    <b className='w-1/4 flex text-right'>Status</b> : <span className='w-2/4 text-left'>{items.status}</span>
                                                </div>

                                            </Link>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </section>


                </>
            }

        </>







    )
}

export default Order