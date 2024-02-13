import { FaEdit } from 'react-icons/fa';

function Card({ img_url, name, updateGadget, gadget_id }) {
    return (
        <div className="card product-card">
            <img className="card-img-top" src={img_url} alt="Card image cap" />
            <div className="card-body p-card-body">
                <p className="card-text">{name}</p>
                <div className="button-container">
                    <button className="edit-button" onClick={()=>{updateGadget(gadget_id)}}><FaEdit /></button>
                </div>
            </div>
        </div>
    );
}

export default Card;
