import React from 'react';

class CartItem extends React.Component{

    increaseQuantity = () => {
        console.log('this : ', this);
    }

    render() {
        // Object destructurting
        const {title, price, qty} = this.props.product;
        return (
            <div className="cart-item"> 
                <div className="left-block"> 
                    <img style= {styles.image}></img>
                </div>
                <div className="right-block"> 
                    <div style={ {fontSize: 25} }>{title}</div>
                    <div style={ {color: '#777'} }>Price: Rs {price}</div>
                    <div style={ {color: '#777'} }>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
                            onClick={this.increaseQuantity}
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/128/992/992683.png"
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://cdn-icons-png.flaticon.com/128/3096/3096687.png"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;