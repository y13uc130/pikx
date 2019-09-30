import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
export class NotFound extends Component {
  render() {
    const {
      msg
    } = this.props;
    return (
      <div className="NotFound">
        <div className="NotFoundFormContent">
          <div className="BreakPointContainer">
            <div className="layout column justify-center align-center DisableDeisgnerForm">
            {/* <div className="ConnectErrorImg" ></div> */}
              <div className="sorryMsg h4">Uh-oh!</div>
              <div className="pa4-grey">{msg ? msg : 'Sorry! This Booking-id has been closed.'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withRouter)(NotFound);
