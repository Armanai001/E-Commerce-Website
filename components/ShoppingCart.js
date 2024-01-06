import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillShopping, AiOutlineClear } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { toast } from 'react-toastify'

function ShoppingCart(props) {
    const router = useRouter()
    const [cartProducts, setCartProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [localRefresh, setLocalRefresh] = useState(false)


    // FUNCTIONS FOR BUTTON'S ACTION
    const goToCheckOut = () => {
        router.push('/order/CheckOut')
        props.hideCart()
    }


    const goToProduct = (address) => {
        router.push(address)
        !props.notAllow && props.hideCart()
    }


    const clearCart = () => {
        if (typeof window !== 'undefined') {
            let len = []
            for (let index = 0; index < localStorage.length; index++) {

                if (!localStorage.key(index).startsWith('item_')) {
                    len.push([localStorage.key(index), localStorage.getItem(localStorage.key(index))])
                }
            }

            localStorage.clear()

            for (let index = 0; index < len.length; index++) {
                localStorage.setItem(len[index][0], len[index][1])

            }
            setLocalRefresh(true)
        }
    }

    useEffect(() => {
        if (props.clearCart) {
            try {
                clearCart()
                props.setClearCart(false)

            } catch (error) {
                location.reload()
            }

        }

    }, [props.clearCart])


    const itemAdd = (e, id) => {
        let element = JSON.parse(localStorage.getItem(`item_${id}`))
        let newQty = (e.target.value)

        if (element.available >= newQty) {
            if (element) {
                element.quantity = parseInt(newQty);
                localStorage.setItem(`item_${id}`, JSON.stringify(element))
                setLocalRefresh(true)
            } else {
                removeItem(id)
            }
        } else {
            toast.error("Not allowed")
        }
    }

    const removeItem = (id) => {
        localStorage.removeItem(`item_${id}`)
        setLocalRefresh(true)
    }




    // USE-EFFECTS FOR REAL TIME VALUE CHANGING EXPERIENCE
    useEffect(() => {
        if (typeof window != 'undefined') {
            let elements = [];
            let totalPrice = 0;
            setTotal(0)
            setCartProducts([])

            for (let index = 0; index < localStorage.length; index++) {

                if (localStorage.key(index).startsWith('item_')) {
                    let data = JSON.parse(localStorage.getItem(localStorage.key(index)))
                    elements.push(data)
                    totalPrice = totalPrice + (data.price * data.quantity)
                }
            }
            setCartProducts(elements)
            setTotal(totalPrice)
            setLocalRefresh(false)

        }
    }, [props.refresh === true, localRefresh === true])

    const cartSubmit = (e) => {
        e.preventDefault()
        setLocalRefresh(true)
        if (cartProducts.length > 0  ) {
            props.setUserOrders({ products: cartProducts.map(item => { return { id: item.id, quantity: item.quantity } }), total: total })
            props.setProductStatus(0)
            props.submit()
        } else {
            toast.info("Your cart is empty.")
        }

    }


    return (
        <>
            {/* CHECKOUT PAGE PAY BUTTON */}
            {
                props.notAllow &&
                <div className='text-lg my-3 mx-2 flex justify-between'>
                    <div> Review Items </div>
                    <div onMouseEnter={() => { setLocalRefresh(true) }} className="text-white flex justify-around flex-wrap text-sm md:text-lg">
                        <button onClick={cartSubmit} className={` bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded `}> Pay ${total} </button>
                    </div>
                </div>
            }


            {/* CART FOR SHOPPING AS USUAL */}

            <div className="bg-blue-100 rounded-lg p-2 px-4 flex flex-col  w-full mt-0 ">

                <span className=" text-gray-900 text-sm md:text-lg font-medium title-font mb-0 flex justify-center  flex-wrap items-center">
                    <span>User Cart </span>
                    <BiRefresh className='text-indigo-400 text-2xl mx-4 cursor-pointer hover:text-indigo-900' onClick={() => { setLocalRefresh(true) }} />
                </span>

                {!props.notAllow &&
                    <div className="text-white flex justify-center flex-wrap text-sm md:text-lg mt-1 border-b-2 border-indigo-700">
                        <button className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Check Out" onClick={goToCheckOut} > <AiFillShopping /></button>
                        <button className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none hover:bg-indigo-600 rounded `} title="Clear cart" onClick={clearCart}> <AiOutlineClear /> </button>
                        <div id='refreshCart' className={` bg-indigo-500 border-0 py-2 px-3 mx-1 md:mx-3 my-3 focus:outline-none rounded cursor-pointer`} title='Refresh' onClick={() => { setLocalRefresh(true) }} > ${total} </div>
                    </div>
                }

                <ol className='list-decimal text-sm md:text-xl m-1 box-border w-full px-2  md:px-5'>

                    {cartProducts.length === 0 ? <div>Add to cart for showing here.</div> : cartProducts.map(item => {
                        return (
                            <li className='p-1 py-2' key={item.id}>
                                <div className='flex items-center w-full justify-between '>
                                    <div className=' max-w-3/4 px-2 cursor-pointer' onClick={() => { goToProduct(`/product/${item.slug}`) }} >{item.name} ( {item.color} )</div>
                                    <div className='w-28 md:w-32 px-2 mx-2 flex items-center  justify-between '>
                                        <>
                                            <input type="number" value={item.quantity} onChange={(e) => { itemAdd(e, item.id) }} className="p-1 text-sm md:text-lg" min={0} max={item.available ? item.available : 100} />
                                            <AiFillDelete className='p-1 text-3xl cursor-pointer' onClick={() => { removeItem(item.id) }} title="Remove item" />
                                        </>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </>
    )
}

export default ShoppingCart