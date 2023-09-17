function ViewEarBuds({ gadget }) {
    return (
        <>
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
        </>
    )
}
export default ViewEarBuds;