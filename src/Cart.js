import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component{
    constructor() {
        // calling the constructor of the parent class Component
        super();
        this.state = {
            products: [
                {
                    title: "Phone",
                    price: 999,
                    qty: 0,
                    img: " ",
                    id: 1
                },
                {
                    title: "Watch",
                    price: 2000,
                    qty: 0,
                    img: "",
                    id: 2
                },
                {
                    title: "Laptop",
                    price: 10000,
                    qty: 0,
                    img: " ",
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

    render() {
        const {products} = this.state;
        return(
            <div className="cart">
                {products.map((product) => {
                    return(
                        <CartItem 
                            product={product} 
                            key={product.id}
                            onIncreaseQuantity={this.handleIncreaseQuantity}
                            onDecreaseQuantity={this.handleDecreaseQuantity}
                            onDeleteProduct={this.handleDeleteProduct}
                        />
                    )
                })}
            </div>
        );
    }
}



export default Cart;