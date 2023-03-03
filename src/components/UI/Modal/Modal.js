import React from 'react';
import Input from '../Input/Input';

const Modal = (props) => {
    return (
        <>
            <input type="checkbox" id={props.modalId} className="modal-toggle" />
            <label htmlFor={props.modalId} className="modal cursor-pointer">
                <label className="modal-box relative rounded-none" htmlFor="">
                    <h3 className="text-2xl font-semibold">{props.modalTitle}</h3>
                    <form onSubmit={props.handleSubmit}>
                        
                        {props.children}

                        <input type="submit" value="Save" className="btn btn-sm rounded-none" />
                    </form>

                </label>
            </label>
        </>
    );
};

export default Modal;