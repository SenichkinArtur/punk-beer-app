import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Cart extends Component {
    constructor() {
        super();
        this.inputVal = this.inputVal.bind(this);
    }

    inputVal(event, item, changeCount) {
        // quantity input validation
        let newCount = event.target.value;
        if(newCount < 0 || isNaN(newCount)) {
            newCount = 0;
        }
        newCount = Math.round(newCount);
        changeCount(item, newCount);
    }

    render() {
        let cart = this.props.cart;
        let changeCount = this.props.changeCount;
        let removeFromCart = this.props.removeFromCart;
        let totalPrice = 0;

        for(let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].totalPrice; // total price of all products in the cart
        }

        return (
        <div className="cart_wrap">
            <h2 className="page_title">Cart</h2>
            <div className="beer_item_wrap">
                {
                    cart.map((cartItem) => {
                        return (
                            <div key={cartItem.item.id} className="cart_item">
                                <div className="cart_item_info">
                                    <div className="cart_item_img_wrap">
                                        <img className="cart_item_img" src={cartItem.item.image_url} alt={cartItem.item.name}/>
                                    </div>
                                    <Link to={`/products/${cartItem.item.id}`} className="cart_item_title">
                                        <p className="cart_item_title_text">{cartItem.item.name}</p>
                                        <p className="cart_item_title_text">{cartItem.item.price}$</p>
                                    </Link>
                                </div>
                                <div className="cart_item_func">
                                    <p>Quantity: </p>
                                    <input className="cart_item_count_input" type="text" value={cartItem.count} onChange={(event) => {this.inputVal(event, cartItem.item, changeCount)}} />
                                    <p>Price: <span className="cart_item_price">{cartItem.count * cartItem.item.price} $</span></p>
                                </div>
                                <i className="fas fa-trash cart_item_func_btn" onClick={() => removeFromCart(cartItem.item.id)}></i>
                            </div>
                        );
                    })
                }
                <div className="cart_totalprice">
                    {totalPrice
                        ? <div>Total price: <span className="cart_totalprice_price"> {totalPrice}  $</span></div>
                        : null
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default Cart;