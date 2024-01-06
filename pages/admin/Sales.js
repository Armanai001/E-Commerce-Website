import React from 'react'
import { Grid } from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";

function Sales() {
    return (
        <Grid item xs={12} lg={12}>
            <SalesOverview />
        </Grid>
    )
}

export default Sales