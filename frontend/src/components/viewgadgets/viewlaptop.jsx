function ViewLaptop({ gadget }) {

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
            <tr>
                <td><b>RAM</b></td>
                <td>{gadget.gadgetSpecs?.RAM}</td>
            </tr>
            <tr>
                <td><b>OS</b></td>
                <td>{gadget.gadgetSpecs?.OS}</td>
            </tr>
            <tr>
                <td><b>Secondary Storage</b></td>
                <td>{gadget.gadgetSpecs?.Internal}</td>
            </tr>
            <tr>
                <td><b>Processor</b></td>
                <td>{gadget.gadgetSpecs?.Processor}</td>
            </tr>
        </>
    )
}

export default ViewLaptop;