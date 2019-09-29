import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';
import ImageLoader from '../../components/ImageLoader/ImageLoader';
import classnames from 'classnames';
import { addCommas } from '../../utils';
import { addToCartAction } from '../../services/MenuPage/MenuPageActionCreators';
import FullPageLoader from '../../components/FullPageLoader';
import EachDishItem from './EachDishItem';

class MenuPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      addBtnChange: [],
      cart_items: [],
      noItemAdded: true,
      totalCartItems: 0,
      totalPayable: 0,
      loading: false
    }
  }
  componentDidMount() {
    const { cart_items, totalPayable, totalCartItems } = this.props;
    if(cart_items && !!cart_items.length) {
      this.setState({
        loading: true
      })
      let cartitem_ids= []
      cart_items.map((dish)=> {
        cartitem_ids.push(dish._id);
        return dish;
      })
      this.setState({
        addBtnChange: this.state.addBtnChange.concat(cartitem_ids),
        cart_items,
        totalPayable,
        noItemAdded: false,
        totalCartItems,
        loading: false
      })
    }
  }
  handleAddClick= ({name,_id, price, offerPrice, image, type}) => {
    if(this.state.noItemAdded) {
      this.setState({
        noItemAdded: false
      })
    }
    let itemToAdd = {
      name,
      _id,
      offerPrice: offerPrice ? parseInt(offerPrice) : 0,
      price: parseInt(price),
      count: 1,
      image,
      type
    }
    let amountToAdd = itemToAdd.offerPrice ? itemToAdd.offerPrice: itemToAdd.price;
    this.setState({
      totalPayable: this.state.totalPayable+amountToAdd
    })
    this.setState({
      addBtnChange: [...this.state.addBtnChange, _id],
      cart_items: [...this.state.cart_items, itemToAdd],
      totalCartItems: this.state.totalCartItems+1,
    })
  }
  handleRemoveItem = (dish)=> {
    let cart_items = [...this.state.cart_items];
    let removeFromTotalPayable = 0;
    cart_items = cart_items.filter((item)=> {
      if(item._id===dish._id) {
        --item.count;
        removeFromTotalPayable = item.offerPrice ? item.offerPrice : item.price;
        if(item.count===0) {
          let resultbtns = [...this.state.addBtnChange];
          resultbtns = resultbtns.filter(_id=>_id!==dish._id);
          if(resultbtns && !resultbtns.length) {
            this.setState({
              noItemAdded: true,
              cart_items: []
            })
          }
          this.setState({
            addBtnChange: resultbtns
          })
          return;
        }
        return item;
      } else {
        return item;
      }
    })
    this.setState({
      cart_items,
      totalCartItems: this.state.totalCartItems-1,
      totalPayable: this.state.totalPayable-removeFromTotalPayable
    })
  }
  handleAddOneMore = (dish)=> {
    let cart_items = [...this.state.cart_items];
    let addToTotalPayable = 0;
    cart_items = cart_items.map((item)=> {
      if(item._id===dish._id) {
        item.count=item.count+1;
        addToTotalPayable = item.offerPrice ? item.offerPrice : item.price;
      }
      return item;
    })
    this.setState({
      cart_items,
      totalCartItems: this.state.totalCartItems+1,
      totalPayable: this.state.totalPayable+addToTotalPayable
    })
  }
  handleCart = () => {
    const { cart_items, totalPayable, totalCartItems } = this.state;
    const { history } = this.props;
    this.props.addToCartAction(cart_items, totalPayable, totalCartItems); 
    history.push('/checkout/cart');
  }

  renderEachDishItem = (index, dish) =>{
    const {
      cart_items,
      addBtnChange
    } = this.state;
    return (
      <EachDishItem
        dish={dish}
        cart_items={cart_items}
        handleAddClick={this.handleAddClick}
        handleAddOneMore={this.handleAddOneMore}
        handleRemoveItem={this.handleRemoveItem}
        index={index}
        addBtnChange={addBtnChange}
      />
    )
  }

  render() {
    const {
      noItemAdded,
      totalCartItems,
      totalPayable,
      loading,
      addBtnChange
    } = this.state;
    console.log("addtobtn",addBtnChange);
    const {
      data
    } = this.props;
    if(loading) {
      return (
        <FullPageLoader />
      )
    }
    return (
      <div className="MenuPage">
        <div className="Categories">
          {
            Array.isArray(data) && !!data.length && data.map((category)=> {
              return (
                <React.Fragment>
                  <div className="EachCategory" >
                    <div className="h2">{category._id}</div>
                    <div className="borderBottom"></div>
                    <div className="dishItems">
                      {category.dish.map((dish, index)=>{
                        return (
                          <React.Fragment>
                            {this.renderEachDishItem(index, dish)}
                          </React.Fragment>
                        )
                      })}
                    </div>
                  </div>
                  <div className="borderLine"></div>
                </React.Fragment>
              )
            })
          }
        </div>
        {true && (<div className={classnames("cart-preview cartDesign layout",!noItemAdded && 'showcartpreview')}>
            <div className="flex xs7" >
              <div className="layout">
                <div className="pa3-white bold itemCount">{totalCartItems} Items</div>
                <div className="flex xs1 PipeBtwText layout align-center justify-center">|</div>
                <div className="totalPayable pa3-white bold">₹{addCommas(totalPayable)}</div>
              </div>
              <div className="pa5-white bold">From: {'Shagi House'}</div>
            </div>
            <div onClick={this.handleCart} className="flex xs5 layout justify-end align-center">
              <div className="pa2-white bold m-r-10">VIEW CART</div>
              <div className="pikx-sprite cart-icon"></div>
            </div>
          </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
  menuPage  
  } = state;
  
  return {
    cart_items: menuPage.cart_items || [],
    totalPayable: menuPage.totalPayable || 0,
    totalCartItems: menuPage.totalCartItems || 0
  };
};

export default compose(
  withRouter, 
  connect(
    mapStateToProps,
    {
      addToCartAction,
    }
  )
)(MenuPage);