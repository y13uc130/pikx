import React, { Component } from 'react'
import PslLoader from '../PslLoader';
import './styles.scss';

export default class FullPageLoader extends Component {
  render() {
    return (
      <div className="FullPageLoader">
        <div className="FullPageLoaderContent">
          <PslLoader />       
        </div>
      </div>
    )
  }
}
