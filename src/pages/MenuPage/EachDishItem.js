import React, {Component} from 'react';
import ImageLoader from '../../components/ImageLoader/ImageLoader';
import classnames from 'classnames';
import './styles.scss';

class EachDishItem extends Component {

  itemCountRender = (dish) =>{
    const { cart_items } = this.props;
    let result = 0;
    if(cart_items && !!cart_items.length) {
      cart_items && !!cart_items.length && cart_items.map((item)=>{
        if(item._id===dish._id) {
          result= item.count; 
        }
        return item;
      })
      return result;
    } 
    return (
    <div className={classnames("flex xs4 dishCountnoValue pa4-sec layout justify-center align-center", 'dishCountValue', 'count_' + dish._id)}>
      {result}
    </div>
    );
  }
  render() {
    const {
      index,
      dish,
      addBtnChange,
      handleAddClick,
      handleAddOneMore,
      handleRemoveItem,
      cartPage,
      dishTotalPrice,
      dishTotalOfferPrice
    } = this.props;
    let image = false;
    return (
      <div key={index} className={classnames("EachItem layout row", !image && 'justify-space-between', cartPage && 'align-center')}>
        {image && (
          <div className="flex xs4 dishImage">
            <ImageLoader classNames="img-resp" url={dish.image} />
          </div>
        )}
        <div className={classnames("flex xs6 dishBody", cartPage && 'p-l-0')}>
          {!cartPage && <div className="layout align-center">
            <div className="pa2 bold prel">{dish.name}</div>
            <span className={classnames("foodTypeSymbol", dish.type === 'VEG' ? 'vegColor' : 'nonvegColor')}></span>
          </div>}
          {!!cartPage && <div className="layout align-center">
            <span className={classnames("foodTypeSymbol m-l-0 ", dish.type === 'VEG' ? 'vegColor' : 'nonvegColor')}></span>
            <div className="p-l-5 pa2 bold prel">{dish.name}</div>
          </div>}
          <div className="pa3-grey">{dish.description}</div>
          {!cartPage && <div className="ProductPrice layout">
            <div className="SpecialPrice pa3">₹{dish.offerPrice}</div>
            <div className="InitialPrice pa3-grey">₹{dish.price}</div>
          </div>}
        </div>
        <div className="flex xs2 layout align-start justify-center addBtnSize">
          {addBtnChange && !addBtnChange.includes(dish._id) && <span onClick={() => handleAddClick(dish)} className={classnames("addBtn layout align-center justify-center pa4-sec", 'add_' + dish._id)}>ADD</span>}
          {addBtnChange && !!addBtnChange.includes(dish._id) && (<span className="addBtn withCount layout align-center justify-center pa4-sec prel">
            <div onClick={(e) => handleRemoveItem(dish, e)} className="flex xs4 minus layout justify-center align-center"></div>
            <div className="textCount">{this.itemCountRender(dish)}</div>
            <div onClick={(e) => handleAddOneMore(dish, e)} className="flex xs4 pa1-sec layout justify-center align-center plusBtn">+</div>
          </span>)}
        </div>
        {!!cartPage && <div className="ProductPrice xs2 layout column align-end">
          {dishTotalPrice && <div className={classnames("InitialPrice pa4-grey", !dishTotalOfferPrice && 'pa3')}>₹{dishTotalPrice}</div>}
          {dishTotalOfferPrice && <div className="SpecialPrice pa3">₹{dishTotalOfferPrice}</div>}
        </div>}
      </div>
    )
  }
}

export default EachDishItem;