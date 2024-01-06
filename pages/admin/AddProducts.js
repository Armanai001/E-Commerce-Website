import React, { useState } from 'react'

import {
    Grid,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { toast } from 'react-toastify';

function AddProducts() {

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [color, setColor] = useState("")
    const [availableQty, setAvailableQty] = useState("")
    const [price, setPrice] = useState("")
    const [des, setDes] = useState("")



    const addProduct = async () => {

        let data = { title, slug, category, type, color, availableQty, price, des, image: "none" }


        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/addProducts/`, {
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
                <BaseCard title="Add a product">
                    <Stack spacing={2}  >

                        <TextField
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}

                        />
                        <TextField
                            label="Slug"
                            variant="outlined"
                            onChange={(e) => { setSlug(e.target.value) }}
                        />
                        <TextField
                            label="category"
                            variant="outlined"
                            onChange={(e) => { setCategory(e.target.value) }}
                        />
                        <TextField
                            label="type"
                            variant="outlined"
                            onChange={(e) => { setType(e.target.value) }}
                        />
                        <TextField
                            label="color"
                            variant="outlined"
                            onChange={(e) => { setColor(e.target.value) }}
                        />
                        <TextField
                            label="Available quantity"
                            variant="outlined"
                            onChange={(e) => { setAvailableQty(parseInt(e.target.value)) }}
                        />

                        <TextField
                            label="price"
                            variant="outlined"
                            onChange={(e) => { setPrice(parseInt(e.target.value)) }}
                        />

                        <TextField
                            label="Product des"
                            multiline
                            rows={4}
                            onChange={(e) => { setDes(e.target.value) }}
                        />
                    </Stack>
                    <br />
                    <Button variant="text" mt={2} onClick={addProduct} className="bg-cyan-200">
                        Add Product
                    </Button>
                </BaseCard>
            </Grid>
        </Grid>
    )
}

export default AddProducts