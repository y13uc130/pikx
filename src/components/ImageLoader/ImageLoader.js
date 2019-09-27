import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './ImageLoader.scss'

export default class ImageLoader extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      src: '',
      showDefaultImg: false,
      intersected: false,
      lazyloaded: false
    }
  }
  loadImg = url => {
    var img = new Image();
    img.src = url;
    img.onload = () => {
      this.setState({
        loading: false,
        src: img.src,
        lazyloaded: true
      })
      setTimeout(() => {
        this.setState({
          lazyloaded: false
        });
      },100);
    };
    img.onerror = (e) => {
      this.setState({
        showDefaultImg: true,
        loading: false
      })
    };
  }
  srcImage = () => {
    // const { isIntersectionObserver, intersected } = this.state;
    const { url } = this.props;
    // if (isIntersectionObserver) {
    //   return intersected ? url : '';
    // } else {
    //   return url;
    // }
    return url;
  }
  imgClick = e => {
    const { handleImgClick } = this.props;
    if (handleImgClick) {
      handleImgClick(e);
    }
  }
  render() {
    const { 
      state: {
        loading, lazyloaded, showDefaultImg
      }, props: {
        classNames, parentClassNames,
        alt,
        size
      } 
    } = this;
    const containerClass = classnames('dynamicImgContainer prel layout row align-center justify-center',
    loading && 'lazyloading', lazyloaded && 'lazyloaded', parentClassNames, size==='prod-small' && 'addBorderOnDynamicImg');
    return (
      // <div className={containerClass} ref={this.imageLoaderRef}>
      //   {!showDefaultImg && !loading && <img src={this.srcImage()} onClick={this.imgClick} className={classNames}/>}
      //   {showDefaultImg && !loading && <img onClick={this.imgClick} className="default-img" src="//www.perniaspopupshop.com/media/pwa-images/default_img.png" />}
      // </div>
      <div className={containerClass}>
        <img src={this.srcImage()} onClick={this.imgClick} className={classNames} alt={alt} />
      </div>
    )
  }
}