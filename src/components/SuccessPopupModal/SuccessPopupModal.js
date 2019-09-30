import React, { Component } from 'react';
import './styles.scss';
import PerniaModal from '../PerniaModal';
export class SuccessPopupModal extends Component {
  handleOnModalClose = () => {
    this.props.toggleModal();
  }
  render() {
    const {
      isOpen
    } = this.props;
    return (
      <PerniaModal isOpen={isOpen} toggleModal={this.handleOnModalClose}>
        <div className="SuccessModalWrapper layout justify-center align-center column">
          <img src="/psl_static/icons/order-successful.svg" />
          <div className="successTxt1 pa3 bold">YAY!</div>
          <div className="successTxt2 pa4-grey text-center">Your order is placed. Stay with us.<br/>Food will be served in no time.</div>
        </div>
      </PerniaModal>
    );
  }
}

export default SuccessPopupModal;
