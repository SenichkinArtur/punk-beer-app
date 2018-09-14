import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Products from './Components/Products';
import Menu from './Components/Menu';
import Favorites from './Components/Favorites';
import Description from './Components/Description';
import Cart from './Components/Cart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      favorites: [],
      cart: [],
    };
    this.goods = this.goods.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.totalPriceFunc = this.totalPriceFunc.bind(this);
  }

  componentDidMount() {
    fetch("https://api.punkapi.com/v2/beers?page=1&per_page=20")
      .then(response => response.json())
      .then(result => this.goods(result))
      .catch(error => error);

    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
    
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  goods(result) {
    if(this.state.result == null) {
      for(let i = 0; i < result.length; i++) {
        let rand = Math.random() * (20 - 5) + 5;
        rand = Math.round(rand);
        result[i].price = rand;
        result[i].favorite = false;
      }
      this.setState({
        result: result,
      });
    }
  }

  addToFavorites(item, event) {
    let favIcon = event.target;
    let favorites = this.state.favorites;
    let result = this.state.result;

    for(let i = 0; i < favorites.length; i++) {
      if(favorites[i].id === item.id) {
        favorites.splice(i, 1);
        result[item.id-1].favorite = false;
        favIcon.classList.remove("fas");
        favIcon.classList.add("far");
        this.setState({
          favorites: favorites,
          result: result,
        });        
        return null;
      }
    }

    for(let i = 0; i < result.length; i++) {
      if(result[i].id === item.id) {
        result[i].favorite = true;
        favIcon.classList.add("fas");
        favIcon.classList.remove("far");
      }
    }

    favorites.push(item);
    this.setState({
      favorites: favorites,
      result: result,
    });
  }

  addToCart(item, count) {
    let currentItems = this.state.cart;
    for(let i = 0; i < currentItems.length; i++) {
      if(+currentItems[i].item.id === item.id) {
        currentItems[i].count = +currentItems[i].count + count;
        this.totalPriceFunc(item, count);
        this.setState({
          cart: currentItems,
        })
        return null;
      }
    }
    currentItems.push({
      item: item,
      count: count,
    });
    this.setState({
      cart: currentItems,
    });
    this.totalPriceFunc(item, count);
  }

  removeFromCart(id) {
    let cart = this.state.cart;
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].item.id === id) {
        cart.splice(i, 1);
        this.setState({
          cart: cart,
        })
      }
    }
  }

  changeCount(item, count) {
    let currentItems = this.state.cart;
    for(let i = 0; i < currentItems.length; i++) {
      if(+currentItems[i].item.id === item.id) {
        currentItems[i].count = count;
        this.totalPriceFunc(item, count);
        this.setState({
          cart: currentItems,
        })
        return null;
      }
    }
    currentItems.push({
      item: item,
      count: count,
    })
    this.setState({
      cart: currentItems,
    });
    this.totalPriceFunc(item, count);
  }

  totalPriceFunc(item, count) {
    let currentItems = this.state.cart;

    for(let i = 0; i < currentItems.length; i++) {
      if(+currentItems[i].item.id === item.id) {
        currentItems[i].totalPrice = currentItems[i].count * currentItems[i].item.price;
        this.setState({
          cart: currentItems,
        })
        return null;
      }
    }
    currentItems.push({
      totalPrice: item.price * count,
    });
    this.setState({
      cart: currentItems,
    });
  }

  render() {
    let result = this.state.result;
    let favorites = this.state.favorites;
    let cart = this.state.cart;

    if(result == null) return null;
    
    return (
      <Router>
        <div>
            <Menu favorites={this.state.favorites} cart={this.state.cart}></Menu>
            <Route exact path="/" render={ () => <Products result={result} addToFavorites={this.addToFavorites} />} />
            <Route path="/favorites" render={ () => <Favorites favorites={favorites} addToFavorites={this.addToFavorites} /> } />
            <Route path="/products/:productId" render={({ match }) => (
              <Description result={result} productId={match.params.productId} addToFavorites={this.addToFavorites} addToCart={this.addToCart} />
            )} />
            <Route path="/cart" render={ () => <Cart cart={cart} changeCount={this.changeCount} removeFromCart={this.removeFromCart} /> } />
        </div>
      </Router>
    )
  }
}

export default App;