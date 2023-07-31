import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewProduct(){

    const { id } = useParams();

    useEffect(()=>{
        const fetchgadgets = async() => {
            const response = await fetch("http://localhost:4000/api/products/"+id)
            const gadget = await response.json()
            console.log(gadget)
        }

        fetchgadgets();
    },[])

    return(
    <>
        Viewing Product
    </>
    )
}
export default ViewProduct;