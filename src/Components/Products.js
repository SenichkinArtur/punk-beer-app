import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Products extends Component {

    render() {
        let result = this.props.result;
        let addToFavorites = this.props.addToFavorites;

        return (
            <div>
                <h2 className="page_title">Main</h2>
                <div className="beer_item_wrap">
                    {
                        result.map((item) => {
                            return (
                                <div key={item.id} className="beer_item">
                                    <p className="beer_item_title">{item.name}</p>
                                    <img className="beer_item_img" src={item.image_url} alt={item.name}/>
                                    {item.favorite
                                        ? <i onClick={(event) => {addToFavorites(item, event)}} ref={this.favorteIcon} className="fas fa-star add_favorites_btn"></i>
                                        : <i onClick={(event) => {addToFavorites(item, event)}} ref={this.favorteIcon} className="far fa-star add_favorites_btn"></i>
                                    }
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

export default Products;