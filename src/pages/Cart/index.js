import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EachDishItem from '../MenuPage/EachDishItem';
import './styles.scss';
import '../MenuPage/styles.scss';
import quoteImg from './quotes.svg';
import { addToCartAction } from '../../services/MenuPage/MenuPageActionCreators';
import ImageLoader from '../../components/ImageLoader/ImageLoader';
import classnames from 'classnames';
import api from '../../utils/api';
import { setCartItems, setTotalCartItems, setTotalPayable } from '../../utils/localStorage';

class Cart extends Component {
  constructor(props){
    super(props);
    this.state= {
      addBtnChange: [],
      cart_items: [],
      noItemAdded: true,
      totalCartItems: 0,
      totalPayable: 0,
      loading: false,
      _updated: false,
      suggestion: ''
    }
  }
  componentDidMount() {
    const { cart_items, totalPayable, totalCartItems } = this.props;
    if(cart_items && !!cart_items.length) {
      this.mapDataToState(cart_items, totalPayable, totalCartItems);
    } else {
      let cartItems = JSON.parse(localStorage.getItem('cart_items'));
      let total_payable = JSON.parse(localStorage.getItem('totalPayable'));
      let total_cartItems = JSON.parse(localStorage.getItem('totalCartItems'));
      this.mapDataToState(cartItems, total_payable, total_cartItems);
    }
  }

  mapDataToState(cart_items, totalPayable, totalCartItems) {
    this.setState({
      loading: true
    });
    let cartitem_ids = [];
    cart_items.map((dish) => {
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState._updated !==this.state._updated && !!this.state._updated) {
      const { cart_items, totalPayable, totalCartItems } = this.state;
      this.props.addToCartAction(cart_items, totalPayable, totalCartItems); 
      this.setState({
        _updated: false
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
      _updated: true
    })
  }
  handleRemoveItem = (dish)=> {
    let cart_items_final = [...this.state.cart_items];
    let removeFromTotalPayable = 0;
    cart_items_final = cart_items_final.filter((item)=> {
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
          return false;
        }
        return item;
      } else {
        return item;
      }
    })
    this.setState({
      cart_items: cart_items_final,
      totalCartItems: this.state.totalCartItems-1,
      totalPayable: this.state.totalPayable-removeFromTotalPayable,
      _updated: true
    })
    setTimeout(()=>{
      const {
        cart_items,
        totalPayable,
        totalCartItems
      } = this.state;
      this.setDataOnLocalStorage(cart_items, totalPayable, totalCartItems);
    },100);
  }
  handleAddOneMore = (dish)=> {
    let cart_items_final = [...this.state.cart_items];
    let addToTotalPayable = 0;
    cart_items_final = cart_items_final.map((item)=> {
      if(item._id===dish._id) {
        item.count=item.count+1;
        addToTotalPayable = item.offerPrice ? item.offerPrice : item.price;
      }
      return item;
    })
    this.setState({
      cart_items: cart_items_final,
      totalCartItems: this.state.totalCartItems+1,
      totalPayable: this.state.totalPayable+addToTotalPayable,
      _updated: true
    })
    setTimeout(()=>{
      const {
        cart_items,
        totalPayable,
        totalCartItems
      } = this.state;
      this.setDataOnLocalStorage(cart_items, totalPayable, totalCartItems);
    },100);
  }

  setDataOnLocalStorage(cart_items, totalPayable, totalCartItems) {
    setCartItems(cart_items);
    setTotalCartItems(totalPayable);
    setTotalPayable(totalCartItems);
  }

  handleSuggestion = ({target: {value}}) => this.setState({suggestion: value})

  placeOrder = () => {
    const { 
      totalPayable,
      cart_items,
      suggestion
     } = this.state;

    let reqBody = {
      suggestion, 
      booking: {
        _id: localStorage.getItem("booking_id")
      },
      total: totalPayable,
      status: 'NEW_ORDER',
      items: []
    }
    let cartItems = cart_items;
    cartItems && cartItems.map(item=> {
      reqBody.items.push({
        dish: [
          {
            id: item._id,
            name: item.name,
            offerPrice: item.offerPrice
          },
        ],
        quantity: item.count
      })
      return item;
    })
    api.post('/restaurant/order', reqBody).then((res)=> {
      console.log("res",res);
    }).catch(err=>{
      console.log(err);
    })
  }

  render() {    
    const {
      cart_items,
      addBtnChange,
      totalPayable
    } = this.state;
    return (
      <div className="cartPageWrapper" >
        <div className="cartHeader">
          <div className="layout align-center cartHeaderTop">
            <img src={'/psl_static/icons/back.svg'} className="iconNew " onClick={()=>this.props.history.push('/menu')} />
          </div>
        </div>
        {(!cart_items || !!cart_items && !cart_items.length) && (
          <div className="emptyCartWrapper" >
            <div className="kitchenImg"></div>
            <div className="emptyCartTxt">
              <div className="CartTxt1 h5">Good food is always cooking</div>
              <div className="CartTxt2 pa4-grey">Your cart is empty. Add something from the menu</div>
            </div>
          </div>
          )
        } 
        {!!cart_items && !!cart_items.length && (  
          <div className="cartBody">
            <div className="cartItems">
              <div className="HotelDetails">
              <div className="EachItem p-t-0 layout row">
                <div className="flex xs2 dishImage">
                  <ImageLoader classNames="img-resp" url={'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/ysj9t5tox1kzoyupaapp'} />
                </div>
                <div className="flex xs6 dishBody cartPageHeading">
                  <div className="pa2 bold prel">{'Burger King'}</div>
                  <div className="pa3-grey">{'Scruz Bandra East'}</div>
                </div>
              </div>
              </div>
              {
                Array.isArray(cart_items) && cart_items.length && cart_items.map((dish, index)=>{
                  return (
                    <React.Fragment key={index} >
                      <EachDishItem
                        dish={dish}
                        cart_items={cart_items}
                        handleAddClick={this.handleAddClick}
                        handleAddOneMore={this.handleAddOneMore}
                        handleRemoveItem={this.handleRemoveItem}
                        index={index}
                        addBtnChange={addBtnChange}
                        cartPage={true}
                        dishTotalOfferPrice={parseInt(dish.offerPrice)*(dish.count)}
                        dishTotalPrice={parseInt(dish.price)*(dish.count)}
                      />
                    </React.Fragment>
                  )
                })
              }
              <div className="borderBottom"></div>
            </div>
            <div className="suggestionsWrap">
              <div className="layout align-center">
                <svg className="quoteImg" viewBox="0 0 32 32"><path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path></svg>
                <input onChange={this.handleSuggestion} className="suggestions" placeholder="Any suggestions? We will pass it on..." type="text" />
              </div>
            </div>
            <div className="borderLine"></div>
            <div className="couponWrapper layout align-center">
              <svg className="couponImg flex xs1" viewBox="0 0 32 32" height="19" width="19" fill="#686b78"><path d="M14.2 2.864l-1.899 1.38c-0.612 0.447-1.35 0.687-2.11 0.687h-2.352c-0.386 0-0.727 0.248-0.845 0.613l-0.728 2.238c-0.235 0.721-0.691 1.348-1.302 1.79l-1.905 1.385c-0.311 0.226-0.442 0.626-0.323 0.991l0.728 2.241c0.232 0.719 0.232 1.492-0.001 2.211l-0.727 2.237c-0.119 0.366 0.011 0.767 0.323 0.994l1.906 1.384c0.61 0.445 1.064 1.070 1.3 1.79l0.728 2.24c0.118 0.365 0.459 0.613 0.844 0.613h2.352c0.759 0 1.497 0.24 2.107 0.685l1.9 1.381c0.313 0.227 0.736 0.227 1.048 0.001l1.9-1.38c0.613-0.447 1.349-0.687 2.11-0.687h2.352c0.384 0 0.726-0.248 0.845-0.615l0.727-2.235c0.233-0.719 0.688-1.346 1.302-1.794l1.904-1.383c0.311-0.226 0.442-0.627 0.323-0.993l-0.728-2.239c-0.232-0.718-0.232-1.49 0.001-2.213l0.727-2.238c0.119-0.364-0.012-0.765-0.324-0.992l-1.901-1.383c-0.614-0.445-1.070-1.074-1.302-1.793l-0.727-2.236c-0.119-0.366-0.461-0.614-0.845-0.614h-2.352c-0.76 0-1.497-0.239-2.107-0.685l-1.903-1.382c-0.313-0.227-0.736-0.226-1.047-0.001zM16.829 0.683l1.907 1.385c0.151 0.11 0.331 0.168 0.521 0.168h2.352c1.551 0 2.927 1 3.408 2.475l0.728 2.241c0.057 0.177 0.169 0.332 0.321 0.442l1.902 1.383c1.258 0.912 1.784 2.531 1.304 4.006l-0.726 2.234c-0.058 0.182-0.058 0.375-0.001 0.552l0.727 2.237c0.48 1.477-0.046 3.096-1.303 4.007l-1.9 1.38c-0.153 0.112-0.266 0.268-0.324 0.447l-0.727 2.237c-0.48 1.477-1.856 2.477-3.408 2.477h-2.352c-0.19 0-0.37 0.058-0.523 0.17l-1.904 1.383c-1.256 0.911-2.956 0.911-4.213-0.001l-1.903-1.384c-0.15-0.11-0.332-0.168-0.521-0.168h-2.352c-1.554 0-2.931-1.001-3.408-2.477l-0.726-2.234c-0.059-0.18-0.173-0.338-0.324-0.448l-1.902-1.381c-1.258-0.912-1.784-2.53-1.304-4.008l0.727-2.235c0.058-0.179 0.058-0.373 0.001-0.551l-0.727-2.236c-0.481-1.476 0.046-3.095 1.302-4.006l1.905-1.385c0.151-0.11 0.264-0.265 0.323-0.444l0.727-2.235c0.478-1.476 1.855-2.477 3.408-2.477h2.352c0.189 0 0.371-0.059 0.523-0.17l1.902-1.383c1.256-0.911 2.956-0.911 4.212 0zM18.967 23.002c-1.907 0-3.453-1.546-3.453-3.453s1.546-3.453 3.453-3.453c1.907 0 3.453 1.546 3.453 3.453s-1.546 3.453-3.453 3.453zM18.967 20.307c0.419 0 0.758-0.339 0.758-0.758s-0.339-0.758-0.758-0.758c-0.419 0-0.758 0.339-0.758 0.758s0.339 0.758 0.758 0.758zM10.545 14.549c-1.907 0-3.453-1.546-3.453-3.453s1.546-3.453 3.453-3.453c1.907 0 3.453 1.546 3.453 3.453s-1.546 3.453-3.453 3.453zM10.545 11.855c0.419 0 0.758-0.339 0.758-0.758s-0.339-0.758-0.758-0.758c-0.419 0-0.758 0.339-0.758 0.758s0.339 0.758 0.758 0.758zM17.78 7.882l2.331 1.352-7.591 13.090-2.331-1.352 7.591-13.090z"></path></svg>
              <div className="couponCode pa3 bold flex xs10" >Apply Coupon</div>
              <div className="arrowRight"></div>
            </div>
            <div className="borderLine"></div>
            <div className="BillDetails">
            <div className="pa3 bold BillHeading">Bill Details</div>
            <div className="itemTotal layout align-center justify-space-between">
              <div className="pa4 bold">Item Total</div>
              <div className="itemTotalValue pa4">₹{totalPayable}</div>
            </div>
            <div className="restaurantCharge layout align-center justify-space-between">
              <div className="pa4 bold">Restaurant Charges</div>
              <div className="charges pa4">₹30</div>
            </div>
            <div className="TotalDiscount layout align-center justify-space-between">
              <div className="pa4">Total Discount</div>
              <div className="discountValue pa4">-₹50</div>
            </div>
            <div className="borderBottom"></div>
            <div className="layout justify-space-between align-center">
              <div className="flex xs10">
                <div className="pa3" >Delivery Fee</div>
                <div className="pa4 green-color" >Free Delivery because you're SUPER!</div>
              </div>
              <div className="pa4 green-color line-through">₹35.00</div>
              <div className="pa4 green-color m-l-5">FREE</div>
            </div>
            <div className="borderBottom"></div>
            <div className="layout align-center justify-space-between">
              <div className="pa3 bold">To Pay</div>
              <div className="pa3">₹{totalPayable-20}</div>
            </div>
          </div>
          </div>
        )}
        <div className={classnames("cart-preview cartDesign layout", 'showcartpreview')}>
          <div onClick={!!cart_items && !!cart_items.length ? this.placeOrder : ()=>this.props.history.push('/menu')} className="layout justify-center align-center">
            <div className="pa2-white bold m-r-10">{!!cart_items && !!cart_items.length?'PLACE THE ORDER': 'ADD SOMETHING'}</div>
          </div>
        </div>
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
      addToCartAction
    }
  )
)(Cart);