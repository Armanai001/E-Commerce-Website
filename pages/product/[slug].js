import Image from 'next/image';
import Product from '../../models/Product'
import mongoose from 'mongoose';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';




function slug({ product, variant, error }) {

    const [Update, setUpdate] = useState(false)
    const router = useRouter()





    useEffect(() => {
        setUpdate(false)
        let refreshCart = document.getElementById('refreshCart')
        refreshCart && refreshCart.click()


    }, [Update === true])

    const goToPage = (url) => {
        router.push(url)
    }


    const addToCart = (e) => {
        e.preventDefault()
        setUpdate(true)

        let quantity = parseInt(e.target[0].value);


        if (typeof window !== 'undefined') {

            let data = { id: product._id, slug: product.slug, quantity: quantity, price: product.price, name: product.title, color: product.color, available: product.availableQty }
            localStorage.setItem(`item_${product._id}`, JSON.stringify(data))

            if (quantity === 1) {
                toast.success("Item added successfully.", {
                    autoClose: 500,
                })
            } else {
                toast.success("Items added successfully.", {
                    autoClose: 500,
                })
            }


        }
    }

    const BuyNow = (e) => {
        let quantity = e.target.form[0].value

        if (quantity <= product.availableQty) {
            goToPage("/order/CheckOut")
        } else {
        }


    }



    // Pin Checking
    const CheckPin = async (e) => {
        e.preventDefault()
        let pin = e.target[0].value



        let pinData = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/Pincode`);
        let data = await pinData.json()


        if ((pin) && data.includes(parseInt(pin))) {
            toast.success("Ok , Location Available.", {
                autoClose: 1000,
            })
        } else if ((pin) && !data.includes(parseInt(pin))) {
            toast.error("No , Location Not Available.", {
                autoClose: 2000,
            })
        }
    }



    return (
        <>

            {error ? <Error statusCode={404} /> :

                <section className="text-gray-600 body-font overflow-x-auto">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap h-fit text-sm w-fit justify-center items-center">
                            <div className='w-4/5 md:w-1/2 h-auto'>
                                {<Image className='w-full lg:h-full items-center justify-center ' width={470} height={240} alt="Product Image" src={`/Products/${product.image}`} />
                                }
                            </div>

                            <div className="md:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">PRODUCT NAME</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 ">{product.title} ({product.color}) </h1>

                                {product.color !== "White" && <div className="flex mb-4 " >
                                    <span className="flex items-center">
                                        <svg style={{ color: product.color }} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg style={{ color: product.color }} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg style={{ color: product.color }} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg style={{ color: product.color }} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <svg style={{ color: product.color }} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                        <span className="text-gray-600 ml-3">4B Reviews</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                        <a className="text-gray-500">
                                            <svg style={{ color: product.color }} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </a>
                                        <a className="text-gray-500">
                                            <svg style={{ color: product.color }} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </a>
                                        <a className="text-gray-500">
                                            <svg style={{ color: product.color }} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                                }


                                <p className="leading-relaxed">{product.des}</p>
                                <p className="leading-relaxed my-3"><strong>Type</strong> :  {product.type}</p>
                                {product.color !== "White" &&
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 flex-col md:flex-row ">
                                        <div className="flex my-4 ">
                                            {
                                                variant.map(item => {
                                                    return (
                                                        <div key={item[0]} style={{ background: item[0] }} onClick={() => { goToPage(`./${item[1]}`) }} className='border-2 mx-2 border-green-900 rounded-full w-6 h-6 focus:outline-none cursor-pointer' ></div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>}

                                <div className="flex items-center justify-evenly mb-3 text-black">

                                    <span className='text-lg flex flex-wrap w-full md:text-xl mr-5'>{product.availableQty === 0 ? <div className="text-red-900">Out of Stock</div> : `Available Quantity :  ${product.availableQty}`}</span>

                                </div>


                                <form onSubmit={addToCart}>
                                    <div className="flex flex-wrap items-center justify-evenly md:justify-between text-sm ">
                                        <p className="w-fit title-font font-medium text-xl md:text-2xl text-gray-900">${product.price}cr</p>
                                        <input type='number' className="w-14 text-sm border-2 border-black p-1 md:w-20 md:text-xl text-gray-900 ml-1 mr-1" defaultValue={1} max={product.availableQty} min={1} />
                                        <button disabled={product.availableQty === 0} onClick={BuyNow} className="disabled:bg-indigo-200 md:w-fit  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded my-4">Buy Now</button>
                                        <input disabled={product.availableQty === 0} type="submit" value="Add to Cart" className="disabled:bg-indigo-200 disabled:cursor-default cursor-pointer md:w-fit  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded my-4" />
                                    </div>
                                </form>


                                <div>
                                    <form onSubmit={CheckPin} >
                                        <div className="flex flex-wrap w-full  items-center  justify-evenly mt-10 md:mt-2 md:justify-between ">
                                            <div>Check if Serviceability is available for your pin code</div>
                                            <input type='number' className="w-1/2 title-font font-medium max-h-7  border  rounded-md border-slate-900" placeholder=' Enter Pin code' name='pinCode' min={0} />
                                            <input type="submit" value="Submit" className="w-fit  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded my-4" />
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section >
            }
        </>
    )
}


export async function getServerSideProps(context) {


    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGODB_URL)
    }

    let error = false;
    let Variants = null;

    let productSlug = await Product.findOne({ slug: context.query.slug })

    if (!productSlug) {
        error = true
    } else {
        let final = await Product.find({ 'title': productSlug.title })

        Variants = final.map(item => {
            return [item.color, item.slug]
        })
    }
    return {

        props: { product:( !error && JSON.parse(JSON.stringify(productSlug))), variant: Variants, error: error }
    }

}

export default slug