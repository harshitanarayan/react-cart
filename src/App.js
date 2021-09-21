import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component{

    constructor() {
      // calling the constructor of the parent class Component
      super();
      this.state = {
          products: [
              {
                  title: "Phone",
                  price: 999,
                  qty: 0,
                  img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
                  id: 1
              },
              {
                  title: "Watch",
                  price: 2000,
                  qty: 0,
                  img: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
                  id: 2
              },
              {
                  title: "Laptop",
                  price: 10000,
                  qty: 0,
                  img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
                  id: 3
              }
          ]
      }
  }

  handleIncreaseQuantity = (product) => {
      // console.log("Hey, please inc the quantity of ", product)
      //array of the products 
      const {products} = this.state;
      const index = products.indexOf(product);
      products[index].qty += 1;
      this.setState({
          //products: products
          products
      })
  }

  handleDecreaseQuantity = (product) => {
      // console.log("Hey, please inc the quantity of ", product)
      //array of the products 
      const {products} = this.state;
      const index = products.indexOf(product);
      if(products[index].qty === 0) {
          return;
      }
      products[index].qty -= 1;
      this.setState({
          //products: products
          products
      }) 
  }

  handleDeleteProduct = (id) => {
      const {products} = this.state;
      const productsUpdated = products.filter((product) => product.id !== id);
      this.setState({
          products: productsUpdated
      })

  }

  getCartCount = () => {
    const {products} = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  }

  getCartTotal = () => {
    const {products} = this.state;
    let cartTotal = 0;
    products.forEach((product) => {
      cartTotal += product.qty * product.price;
    });
    return cartTotal;
  }

  render() {
    const {products} = this.state;
    return(
      <div className="App"> 
        <Navbar count={this.getCartCount()}/>
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{padding: 10, fontSize: 20}}> TOTAL : {this.getCartTotal()}</div>
      </div>
    );
  }
}


export default App;
