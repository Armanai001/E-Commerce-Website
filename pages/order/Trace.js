import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import Image from 'next/image'

function Trace(props) {

    const router = useRouter();
    const { id } = router.query;





    const [refreshState, setRefreshState] = useState(true)
    const [ordersData, setOrdersData] = useState([])
    const [imageData, setImageData] = useState("")
    const [slugData, setSlugData] = useState("")



    const fetchOrders = async (data) => {

        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/getOrder/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data, id: id })
        })

        let msg = await response.json()
        setOrdersData(msg)


    }




    useEffect(() => {

        if (typeof window !== 'undefined') {

            if (refreshState === true) {
                let data = JSON.parse(localStorage.getItem('defaultToken'))
                fetchOrders(data)
                setRefreshState(false)

            }

        }

    }, [refreshState])



    const defaultSelected = (imagedata, slugData) => {
        setImageData(imagedata)
        setSlugData(slugData)
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


                    <section className="text-gray-600 body-font overflow-hidden ">
                        <div className="container px-5 py-7 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                    <h2 className="text-xs md:text-sm title-font text-gray-500 flex items-center justify-center ">AiEmperor.COM <BiRefresh className='mx-5 text-2xl my-4 cursor-pointer' onClick={() => { setRefreshState(true) }} /> </h2>
                                    <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4 text-center">Order id : {ordersData.orderId}</h1>

                                    <p className="leading-relaxed mb-4 gap-2 text-sm text-center">Order will reach after 10 sec of Your pay.</p><hr />
                                    <p className="leading-relaxed flex gap-5 my-2 text-sm"><span className=' w-1/2 text-right font-bold' >Product Count  </span> : <span className='w-1/2 text-left'>{ordersData.products && ordersData.products.length}</span></p><hr />
                                    <p className="leading-relaxed flex gap-5 my-2 text-sm"><span className=' w-1/2 text-right font-bold' >Created Date  </span> : <span className='w-1/2 text-left'> {JSON.stringify(Date(ordersData.createdAt)).substring(5, 16)}</span></p><hr />
                                    <p className="leading-relaxed flex gap-5 my-2 text-sm"><span className=' w-1/2 text-right font-bold' >Status  </span> : <span className='w-1/2 text-left'>{ordersData.status}</span> </p>


                                    <div className="flex flex-col ">
                                        <div className="sm:-mx-6 lg:-mx-8  ">
                                            <div className="py-2 inline-block sm:px-6 lg:px-5  mb-3 border-indigo-400 border-2  rounded-md w-full">
                                                <div className='font-bold text-center text-sm mb-1'>Products </div><hr />
                                                <div className='text-xs md:text-sm '>
                                                    <div className='flex justify-between shadow-md px-3 py-2 w-full bg-indigo-200 rounded-md '>
                                                        <span className='w-4/6 min-w-fit' >Name</span>
                                                        <span className='w-1/6 min-w-fit  text-right' >Quantity</span>
                                                        <span className='w-1/6 min-w-fit  text-right ' >Price</span>
                                                    </div>
                                                    <div className='max-h-72 overflow-y-auto  w-full '>


                                                        {ordersData.products && ordersData.products.map(item => {


                                                            return (
                                                                <div key={item.id} onMouseEnter={() => { defaultSelected(item.image, item.slug) }}>
                                                                    <div className='flex justify-between my-2 px-3 py-2 mx-1 hover:bg-indigo-50 cursor-pointer rounded-lg hover:border-2'>
                                                                        <span className='w-4/6'>{item.title} ({item.color}) </span>
                                                                        <span className='w-1/6 text-right ' >{item.quantity}</span>
                                                                        <span className='w-1/6 text-right ' >{item.price}</span>
                                                                    </div><hr />
                                                                </div>
                                                            )
                                                        })}


                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center">
                                        <span className="title-font font-medium text-lg md:text-2xl text-gray-900">${ordersData.total}</span>
                                        <Link href={`/`} className="text-sm md:text-xl flex ml-auto text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"> <AiFillHome /> </Link>
                                    </div>




                                </div>

                                {!imageData ? "Click on any product for showing details here" :
                                    <div className="md:w-1/2 w-full lg:h-auto h-64 my-auto object-cover object-center  rounded mb-20">

                                        <Image width={350} height={420}  alt="e-commerce" className="  p-5 mx-auto w-auto h-full object-cover object-center rounded" src={`/Products/${imageData}`} />
                                        <Link href={`/product/${slugData}`} className=" cursor-pointer mt-2 justify-center flex text-center bg-indigo-50 rounded-lg" >See details </Link>
                                    </div>
                                }

                            </div>
                        </div>
                    </section>


                </>
            }
        </>
    )
}

export default Trace