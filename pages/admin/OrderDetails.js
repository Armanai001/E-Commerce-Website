import React from 'react'
import Order from '../../models/Order';
import mongoose from 'mongoose';
import { Grid } from "@mui/material";
import Product from '../../models/Product'
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Link from 'next/link';


function OrderDetails({ Orders, Products }) {


    return (
        <>
            <Grid container spacing={0}  >
                <Grid item xs={12} lg={12} className="w-full overflow-x-auto" >
                    <BaseCard title="Order Details"  >
                        <div className='w-full overflow-x-auto'>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    mt: 3,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6" >
                                                <b> Index</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                <b>Name</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                <b>Value</b>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>



                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                1
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Order Id
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.orderId}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>


                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                2
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                User
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.user}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                3
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                User Email
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.email}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                4
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                User Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.name}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                5
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Phone
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.phone}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                6
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Pin Code
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.pinCode}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                7
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                State
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.state}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                8
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                City
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.city}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                9
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Address
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.address}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                10
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Status
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.status}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                11
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Date & Time
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.createdAt}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>


                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                12
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Payment info
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {Orders.paymentInfo}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>


                                    <TableRow   >
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                13
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Total
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                $ {Orders.total} Cr
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </div>

                    </BaseCard>
                </Grid>
            </Grid>

            <Grid container spacing={0}  >
                <Grid item xs={12} lg={12} className="w-full overflow-x-auto" >
                    <BaseCard title={`View Products ( ${Orders.products.length} )`}  >
                        <div className='w-full overflow-x-auto'>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    mt: 3,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <TableHead  >
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Title
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Address
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Color
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Category / Type
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Buying Number
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Price
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color="textSecondary" variant="h6">
                                                Total
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Products.map((item) => (
                                        <TableRow key={item._id}  >
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: "600",
                                                            }}
                                                        >
                                                            <Link href={`/product/${item.slug}`}>Product Page</Link>
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            sx={{
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            <Link href={`/Products/${item.image}`}>Image</Link>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {item.color}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {item.category} ({item.type})
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {item.availableQty}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    ${item.price} Cr
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography align='right' color="textSecondary" variant="h6">
                                                    ${(item.price) * (item.availableQty)} Cr
                                                </Typography>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )

}



export async function getServerSideProps(context) {

    let Products = [];


    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGODB_URL)
    }

    let Orders = await Order.findById(context.query.id)


    for (let index = 0; index < Orders.products.length; index++) {
        const element = Orders.products[index];
        let detail = await Product.findById(element.id)
        detail.availableQty = element.quantity
        Products.push(detail)
    }



    return {
        props: { Orders: JSON.parse(JSON.stringify(Orders)), Products: JSON.parse(JSON.stringify(Products)) }
    }

}

export default OrderDetails