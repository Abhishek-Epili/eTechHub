function ViewHeadPhone({gadget}){
    return(
        <>
            <td className="gadget_details">
                <table>
                    <tbody>
                        <tr>
                            <td><b>Brand</b></td>
                            <td>{gadget.gadgetBrand}</td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{gadget.gadgetName}</td>
                        </tr>
                        <tr>
                            <td><b>Price</b></td>
                            <td>{gadget.gadgetPrice}</td>
                        </tr>
                        <tr>
                            <td><b>Type</b></td>
                            <td>{gadget.gadgetSpecs?.Type}</td>
                        </tr>
                        <tr>
                            <td><b>Wired/Wireless</b></td>
                            <td>{gadget.gadgetSpecs?.wired_or_not}</td>
                        </tr>
                        <tr>
                            <td><b>LED Lighting</b></td>
                            <td>{gadget.gadgetSpecs?.LED_Lighting}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </>
    )
}
export default ViewHeadPhone;