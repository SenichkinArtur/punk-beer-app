import React, { Component } from 'react';
import '../App.css';

class Description extends Component {
    constructor() {
        super();
        this.state = {
            inputVal: null,
        }
        this.inputVal = this.inputVal.bind(this);
    }
    inputVal(event) {
        // quantity input validation
        let count = event.target.value;
        if(count < 0 || isNaN(count)) {
            count = 0;
        }
        count = Math.round(count);
        this.setState({
            inputVal: count,
        });
    }
    render() {
        let result = this.props.result;
        let productId = this.props.productId;
        let addToFavorites = this.props.addToFavorites;
        let addToCart = this.props.addToCart;
        let count = Number(this.state.inputVal);
        let item;
        

        for(let i = 1; i <= result.length; i++) {
            // set the current product to the item
            if(i === +productId) {
                item = result[i-1]; 
            }
        }

        return (
            <div>
                <div key={item.id} className="beer_description">
                    <p className="beer_description_title">{item.name}</p>
                    <p className="beer_description_tagline">"{item.tagline}"</p>
                    <div className="beer_description_content">
                        <img className="beer_description_img" src={item.image_url} alt={item.name}/>
                        <div className="beer_description_info">
                            <p className="beer_description_info_text">
                                <span className="beer_description_info_title">Description: </span>
                                {item.description}
                            </p>
                            <p className="beer_description_info_text">
                                <span className="beer_description_info_title">Food pairing: </span>
                                {item.food_pairing[0] + ". "}
                                {item.food_pairing[1] + ". "}
                                {item.food_pairing[2] + ". "}
                            </p>
                            <p className="beer_description_info_text">
                                <span className="beer_description_info_title">ABV: </span>
                                {item.abv}
                            </p>
                            <p className="beer_description_info_text">
                                <span className="beer_description_info_title">IBU: </span>
                                {item.ibu}
                            </p>
                            <p className="beer_description_info_text">
                                <span className="beer_description_info_title">Price: </span>
                                <span className="beer_description_info_price">{item.price} $</span>
                            </p>
                            {item.favorite
                                ? <i onClick={(event) => {addToFavorites(item, event)}} ref={this.favorteIcon} className="fas fa-star add_favorites_btn"></i>
                                : <i onClick={(event) => {addToFavorites(item, event)}} ref={this.favorteIcon} className="far fa-star add_favorites_btn"></i>
                            }
                            <div className="beer_description_cart_wrap">
                                <input className="beer_description_count_input" type="text" value={count} onChange={this.inputVal}/>
                                <button className="beer_description_cart_btn" onClick={() => {addToCart(item, count)}}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Description;