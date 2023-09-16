import { useParams } from "react-router-dom";
import ViewSmartPhone from "./viewgadgets/viewsmartphone";
import ViewEarBuds from "./viewgadgets/viewearbuds";
import ViewLaptop from "./viewgadgets/viewlaptop";
import ViewHeadPhone from "./viewgadgets/viewheadphone";
import { useState, useEffect } from "react";

function ViewProduct() {
    const { productType, productId } = useParams();

    const [gadget, setGadget] = useState('');


    useEffect(() => {
        const fetchGadgets = async () => {
            const response = await fetch("http://localhost:4000/api/products/" + productId)
            const gadgetDetails = await response.json()
            setGadget(gadgetDetails)
        }
        fetchGadgets();
    }, [productId])

    return (
        <div className="view_product">
            <table>
                <tbody>
                    <tr>
                        <td> <center> <img src={gadget.gadgetImage} /></center></td>
                        {productType === "Smartphone" ? <ViewSmartPhone gadget={gadget} /> : productType === "Laptop" ? <ViewLaptop gadget={gadget} /> : productType === "Headphone" ? <ViewHeadPhone gadget={gadget} /> : productType === "Earbud" ? <ViewEarBuds gadget={gadget} /> : console.log("Not found")}
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}

export default ViewProduct;
