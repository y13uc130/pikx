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
import routePath from '../../routePath';
import { setCartItems, setTotalCartItems, setTotalPayable, getCartItems, getTotalCartItems, getTotalPayable } from '../../utils/localStorage';

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
    this.AddToCartTime = false;
    this.AddMoreToCartTime = false;
    this.RemoveFromCartTime = false;
  }
  componentDidMount() {
    const { cart_items, totalPayable, totalCartItems } = this.props;
    if(cart_items && !!cart_items.length) {
      this.mapDataToState(cart_items, totalPayable, totalCartItems);
    } else {
      let cartItems = getCartItems() ? getCartItems(): [];
      let total_cartItems = getTotalCartItems() ? getTotalCartItems(): 0;
      let total_payable = getTotalPayable() ? getTotalPayable(): 0;
      if(cartItems && !!cartItems.length) {
        this.mapDataToState(cartItems, total_payable, total_cartItems);
      }
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
    console.log('state of cart', this.state.totalCartItems);
    this.setState({
      addBtnChange: [...this.state.addBtnChange, _id],
      cart_items: [...this.state.cart_items, itemToAdd],
      totalCartItems: this.state.totalCartItems+1,
    })
    !!this.AddToCartTime && clearTimeout(this.AddToCartTime);
    this.AddToCartTime = setTimeout(()=>{
      const {
        cart_items,
        totalPayable,
        totalCartItems
      } = this.state;
      this.setDataOnLocalStorage(cart_items, totalPayable, totalCartItems);
    },200);
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
    !!this.RemoveFromCartTime && clearTimeout(this.RemoveFromCartTime);
    this.RemoveFromCartTime = setTimeout(()=>{
      const {
        cart_items,
        totalPayable,
        totalCartItems
      } = this.state;
      this.setDataOnLocalStorage(cart_items, totalPayable, totalCartItems);
    },100);
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
    !!this.AddMoreToCartTime && clearTimeout(this.AddMoreToCartTime);
    this.AddMoreToCartTime = setTimeout(()=>{
      const {
        cart_items,
        totalPayable,
        totalCartItems
      } = this.state;
      this.setDataOnLocalStorage(cart_items, totalPayable, totalCartItems);
    },100);
  }
  handleCart = () => {
    const { cart_items, totalPayable, totalCartItems } = this.state;
    const { history } = this.props;
    this.props.addToCartAction(cart_items, totalPayable, totalCartItems); 
    this.setDataOnLocalStorage(cart_items, totalPayable, totalCartItems);
    history.push(routePath.cartPath);
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

  setDataOnLocalStorage(cart_items, totalPayable, totalCartItems) {
    setCartItems(cart_items);
    setTotalPayable(totalPayable);
    setTotalCartItems(totalCartItems);
  }

  mapDataToState(cart_items, totalPayable, totalCartItems) {
    this.setState({
      loading: true
    });
    let cartitem_ids = [];
    cart_items && cart_items.map((dish) => {
      cartitem_ids.push(dish._id);
      return dish;
    });
    this.setState({
      addBtnChange: this.state.addBtnChange.concat(cartitem_ids),
      cart_items,
      totalPayable,
      noItemAdded: false,
      totalCartItems,
      loading: false
    });
  }

  render() {
    const {
      noItemAdded,
      totalCartItems,
      totalPayable,
      loading,
      addBtnChange
    } = this.state;
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
            Array.isArray(data) && !!data.length && data.map((category, i)=> {
              return (
                <React.Fragment key={i} >
                  <div className="EachCategory" >
                    <div className="h2">{category._id}</div>
                    <div className="borderBottom"></div>
                    <div className="dishItems">
                      {category.dish.map((dish, index)=>{
                        return (
                          <React.Fragment key={index} >
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