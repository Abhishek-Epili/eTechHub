function Card(gadget) {
    return (
        <div className="card product-card">
            <img className="card-img-top" src={gadget.img_url} alt="Card image cap" />
            <div className="card-body p-card-body">
                <p className="card-text">{gadget.name} </p>
            </div>
        </div>
    )
}
export default Card;