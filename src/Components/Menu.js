import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Menu extends Component {
    render() {
        let favorites = this.props.favorites;
        let cart = this.props.cart;
        return (
            <div>
                <div className="header_menu">
                    <div className="header_menu_left">
                        <Link to="/" className="header_menu_item" style={{borderRight: "none"}}>Main page </Link>
                        <Link to="/favorites" className="header_menu_item">Favorites 
                            {favorites.length
                                ? <span className="header_menu_item_count">{favorites.length}</span>
                                : null
                            }
                        </Link>
                    </div>
                    <div className="header_menu_right">
                        <Link to="/cart" className="header_menu_item">Cart page 
                            {cart.length
                                ? <span className="header_menu_item_count">{cart.length}</span>
                                : null
                            }
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;