import React from 'react'
import Image from 'next/image'
import Product from '../models/Product'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'

function Pc({ products }) {
    let router = useRouter()

    const goToPage = (url) => {
        router.push(url)
    }

    return (
        <div >
            <h2 className='text-center text-2xl md:text-3xl'>Best Pc of all time</h2>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 md:justify-evenly">
                        {products.length === 0 ? <div> There is no Products right now. All products become <strong> Out of Stock </strong> due to massive demand of customer. As soon as products come in stock we will notify you. <br /><p className="text-right mr-20 mt-11">Thanks</p> </div>:
                            products.map(items => {
                                return (
                                    <div key={items._id} className="shadow-lg flex flex-col justify-between w-full h-fit p-2 m-5 md:w-5/12 md:h-96  lg:w-3/12">
                                        <div className="flex justify-center relative rounded overflow-hidden cursor-pointer " onClick={() => { goToPage(`product/${items.slug}`) }} >
                                            <Image src={`/Products/${items.image}`} width={430} height={240} alt="Product" />
                                        </div>
                                        <div className="mt-4 p-3">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1"><b>Type</b> : {items.type}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{items.title}</h2>
                                            <p className="mt-1"> <strong>Price</strong> : $ {items.price}Cr</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div >
    )
}


export async function getServerSideProps() {

    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGODB_URL)
    }

    let products = await Product.find({ 'category': 'Pc', 'color': ['White', 'Black'] })

    return {
        props: { products: JSON.parse(JSON.stringify(products)) }
    }

}

export default Pc