import React from 'react'
import { Grid } from "@mui/material";
import Product from '../../models/Product'
import Link from 'next/link';
import mongoose from 'mongoose';
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
import { BiPencil } from 'react-icons/bi'


function Orders({ Products }) {


    return (

        <Grid container spacing={0}  >
            <Grid item xs={12} lg={12} className="w-full overflow-x-auto" >
                <BaseCard title="View Products"  >
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
                                            Available
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Price
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color="textSecondary" variant="h6">
                                            Edit
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

                                        <TableCell align="right">
                                            <Typography variant="h6">
                                                <Link href={`./UpdateProduct?id=${item._id}`}>
                                                    <BiPencil className='text-right text-gray-400 text-xl  cursor-pointer hover:text-black' />
                                                </Link>
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


    )
}



export async function getServerSideProps() {

    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGODB_URL)
    }

    let Products = await Product.find()

    return {
        props: { Products: JSON.parse(JSON.stringify(Products)) }
    }

}


export default Orders