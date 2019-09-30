import React, { Component } from 'react';
import './styles.scss';
export class ToastMsg extends Component {
  render() {
    const {
      msg
    } = this.props;
    return (
      <div className="ToastMsgWrapper">
        <div className={"cart-preview ToastMsg layout"}>
          <div className="layout align-center">
            <div className="pa2-white m-l-10 m-r-10">{msg ? msg : "Sorry! Something's fishy."}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToastMsg;
