import React, { Component } from 'react'
import ReactModal from 'react-modal';
import './styles.scss';

const customStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    padding: '0'
  }
};

export default class PerniaModal extends Component {  
  render() {

    const { isOpen, children, toggleModal, sideModal, noBorderRadius } = this.props;
    if(!!noBorderRadius) {
      customStyles.content.borderRadius = '0px';
      customStyles.content.backgroundColor = '#ffe7ef';
    } else {
      customStyles.content.borderRadius = '4px';
      customStyles.content.backgroundColor = 'white';
    }
    return (
      <ReactModal
        ariaHideApp={false}
        style={customStyles}
        className={sideModal && "RightBottomCornerModal"}
        shouldCloseOnOverlayClick={true}
        isOpen={isOpen}
        shouldCloseOnEsc={true}
        onRequestClose={toggleModal}
        >
        {children}
      </ReactModal>
    )
  }
}
