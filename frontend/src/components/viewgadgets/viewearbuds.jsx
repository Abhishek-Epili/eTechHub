function ViewEarBuds({gadget}){
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
                    </tbody>
                </table>
            </td>
        </>
    )
}
export default ViewEarBuds;