import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewProduct() {

    const [gadget, setGadget] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const fetchGadgets = async () => {
            const response = await fetch("http://localhost:4000/api/products/" + id)
            const gadgetDetails = await response.json()
            setGadget(gadgetDetails)
            console.log(gadgetDetails)
        }
        fetchGadgets();
    }, [id])

    return (
        <>
            {gadget && (
                <>
                    <h2>{gadget.gadgetName}</h2>
                    <img src={gadget.gadgetImage} />
                    <table>
                        <tbody>
                            <tr>
                                <th>Brand</th>
                                <td>{gadget.gadgetBrand}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{gadget.gadgetName}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{gadget.gadgetPrice}</td>
                            </tr>
                            <tr>
                                <th>RAM</th>
                                <td>{gadget.gadgetSpecs?.RAM}</td>
                            </tr>
                            <tr>
                                <th>OS</th>
                                <td>{gadget.gadgetSpecs?.OS}</td>
                            </tr>
                            <tr>
                                <th>Internal Storage</th>
                                <td>{gadget.gadgetSpecs?.Internal}</td>
                            </tr>
                            <tr>
                                <th>Camera</th>
                                <td>{gadget.gadgetSpecs?.Camera}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default ViewProduct;
