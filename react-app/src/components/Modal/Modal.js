import React from 'react';
import './Modal.css';

import { useDispatch, useSelector } from 'react-redux';
import changeModal from '../../store/actionCreators/changeModal'

export default function Modal(props) {
    const dispatch = useDispatch();
    const text = useSelector(state => state.modalText);

    function closeModal(e) {
        if (props.customOnClick) props.customOnClick()
        if (e.target.className === 'modal-wrapper') {
            dispatch(changeModal(false));
        }
    }

    function closeModalOnBtn() {
        if (props.customOnClick) props.customOnClick()
        dispatch(changeModal(false));
    }

    return (
        <div className="modal-wrapper" onClick={closeModal} style={{
            zIndex: props.visible ? 4 : -1,
            opacity: props.visible ? 1 : 0,
            top: props.visible ? 0 : 'auto',
            left: props.visible ? 0 : 'auto'
        }}>
            <div className="modal">
                <p>{text}</p>
                <div className="submit" onClick={closeModalOnBtn}>Ok</div>
            </div>
        </div>
    )
}