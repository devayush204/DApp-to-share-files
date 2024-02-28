import React from 'react'
import "./DocShareModal.css";
const DocShareModal = ({ setModalOpen, contract }) => {
    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        setModalOpen(false);
      };
    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">Share your documents through hash</div>
                    <div className="body">
                        <input
                            type="text"
                            className="address1"
                            placeholder="Enter Account Address"
                        ></input>
                    </div>
                    <div className="body">
                        <input
                            type="text"
                            className="address1"
                            placeholder="Enter Document Hash"
                        ></input>
                    </div>
                    
                    <div className="footer">
                        <button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            id="cancelBtn"
                        >
                            Cancel
                        </button>
                        <button onClick={() => sharing()}>Share</button>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default DocShareModal