import React, { useState, useRouter } from 'react'

import {
    Grid,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { toast } from 'react-toastify';
import Product from '../../models/Product';
import mongoose from 'mongoose';
import Link from 'next/link';



function UpdateProduct({ Products }) {

    const [title, setTitle] = useState(Products.title)
    const [slug, setSlug] = useState(Products.slug)
    const [category, setCategory] = useState(Products.category)
    const [type, setType] = useState(Products.type)
    const [color, setColor] = useState(Products.color)
    const [availableQty, setAvailableQty] = useState(Products.availableQty)
    const [price, setPrice] = useState(Products.price)
    const [des, setDes] = useState(Products.des)
    const [image, setImage] = useState(Products.image)



    const UpdateProduct = async () => {

        let data = { _id: Products._id, title, slug, category, type, color, availableQty, price, des, image }


        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/updateProducts/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([data])
        })

        let msg = await response.text()
        if (response.status === 200) {
            toast.success(msg)
        } else {
            toast.error(msg)

        }

    }



    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard title={`Update : ${Products.title}`}>
                    <Stack spacing={2}  >

                        <TextField
                            label="Title"
                            variant="outlined"
                            onChange={(e) => { setTitle(e.target.value) }}
                            defaultValue={Products.title}
                        />
                        <TextField
                            label="Slug"
                            variant="outlined"
                            onChange={(e) => { setSlug(e.target.value) }}
                            defaultValue={Products.slug}

                        />
                        <TextField
                            label="Image"
                            variant="outlined"
                            onChange={(e) => { setImage(e.target.value) }}
                            defaultValue={Products.image}

                        />
                        <TextField
                            label="category"
                            variant="outlined"
                            onChange={(e) => { setCategory(e.target.value) }}
                            defaultValue={Products.category}

                        />
                        <TextField
                            label="type"
                            variant="outlined"
                            onChange={(e) => { setType(e.target.value) }}
                            defaultValue={Products.type}

                        />
                        <TextField
                            label="color"
                            variant="outlined"
                            onChange={(e) => { setColor(e.target.value) }}
                            defaultValue={Products.color}

                        />
                        <TextField
                            label="Available quantity"
                            variant="outlined"
                            onChange={(e) => { setAvailableQty(parseInt(e.target.value)) }}
                            defaultValue={Products.availableQty}

                        />

                        <TextField
                            label="price"
                            variant="outlined"
                            onChange={(e) => { setPrice(parseInt(e.target.value)) }}
                            defaultValue={Products.price}

                        />

                        <TextField
                            label="Product des"
                            multiline
                            rows={4}
                            onChange={(e) => { setDes(e.target.value) }}
                            defaultValue={Products.des}

                        />
                    </Stack>
                    <br />
                    <Button variant="text" mt={2} onClick={UpdateProduct} className="bg-cyan-200">
                        Update Product
                    </Button>
                </BaseCard>
            </Grid>
        </Grid>
    )

}



export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGODB_URL)
    }

    let Products = await Product.findById(context.query.id)

    return {
        props: { Products: JSON.parse(JSON.stringify(Products)) }
    }

}

export default UpdateProduct