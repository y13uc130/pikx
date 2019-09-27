import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
export class NotFound extends Component {
  componentDidMount() {
    document.querySelector('.AppContent').classList.remove('BreakPointContainer');
    this.fetchRelatedProductsApi(this.props);
  }
  componentWillUnmount() {
    document.querySelector('.AppContent').classList.add('BreakPointContainer')
  }
  render() {
    return (
      <div className="NotFound">
        <div className="NotFoundFormContent">
          <div className="BreakPointContainer">
            <div className="layout align-start DisableDeisgnerForm">
              Not Found
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withRouter,)(NotFound);
