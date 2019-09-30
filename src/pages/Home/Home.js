import React, { PureComponent } from 'react';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import MenuPage from '../MenuPage/MenuPage';
import FullPageLoader from '../../components/FullPageLoader';
import api from '../../utils/api';

export class Home extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      menuData2: []
    }
  }
  componentDidMount() {
    document.title = "PIKX";
    const { history } = this.props;
    this.setState({
      loading: true
    })
    if(!!localStorage.getItem("booking_id")) {
      api.get('/restaurant/menu').then(res=> {
        if(res && res.data && !!res.data.success && Array.isArray(res.data.result) && !!res.data.result.length) {
          this.setState({
            menuData2: res.data.result
          })
        }
        this.setState({
          loading: false
        })
      }).catch(err=>{
        console.log(err);
        this.setState({
          loading: false
        })  
      })
    } else {
      history.push('/error');
      this.setState({
        loading: false
      })
    }
  }
  
  render() {
    let menuData = {
    category: [
      {
        withImages: true,
        title: "Recommended",
        dish: [
          {
            id: "1234567",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "NON-VEG"
          },
          {
            id: "1234561",
            name: "Veg Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366,h_240,c_fill/ds3fupy3ue7agycz37u5",
            type: "VEG"
          },
          {
            id: "1234562",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "240",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1234563",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          }
        ]
      },
      {
        title: "Main Course",
        dish: [
          {
            id: "1234564",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1234565",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1234566",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1234569",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          }
        ]
      },
      {
        title: "Main Course",
        dish: [
          {
            id: "1234560",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1234518",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1234267",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          },
          {
            id: "1214567",
            name: "Chicken Masala",
            description: "Indian, Curry",
            price: "340",
            offerPrice: "306",
            image: "https://yummyindiankitchen.com/wp-content/uploads/2017/08/chicken-masala-spicy-gravy-recipe-indian-restaurant-style.jpg",
            type: "VEG"
          }
        ]
      },
    ]
  }
    const {
      loading,
      menuData2
    } = this.state;
    return (
      <div className="HomePage">
      {!!loading && <FullPageLoader />}
        <MenuPage data={menuData2} />
      </div>
    );
  }
}

export default compose(withRouter)(Home);
