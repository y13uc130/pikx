import React, { PureComponent } from 'react';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import MenuPage from '../MenuPage/MenuPage';

export class Home extends PureComponent {
  componentDidMount() {
    document.title = "PIKX";
  }
  
  render() {
    let menuData = {
      category: [
        {
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
    return (
      <div className="HomePage">
        <MenuPage data={menuData} />
      </div>
    );
  }
}

export default compose(withRouter)(Home);
