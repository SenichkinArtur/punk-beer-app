import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Favorites extends Component {
    render() {
        let favorites = this.props.favorites;
        let addToFavorites = this.props.addToFavorites;
        return (
            <div>
                <h2 className="page_title">Favorites</h2>
                <div className="beer_item_wrap">
                    {
                        favorites.map((item) => {
                            return (
                                <div key={item.id} className="beer_item">
                                    <p className="beer_item_title">{item.name}</p>
                                    <img className="beer_item_img" src={item.image_url} alt={item.name}/>
                                    <i id={"favorite_icon" + item.id} onClick={(event) => {addToFavorites(item, event)}} ref={this.favorteIcon} className="fas fa-star add_favorites_btn"></i>
                                    <p className="beer_item_price">{item.price} $</p>
                                    <Link to={`/products/${item.id}`} className="beer_item_details_btn">
                                        View details
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Favorites;