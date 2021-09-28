import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/app';
import 'firebase/firestore';

class App extends React.Component{

    constructor() {
      // calling the constructor of the parent class Component
      super();
      this.state = {
          products: [],
          loading: true
      }
      this.db = firebase.firestore();
  }

  componentDidMount() {
    //Chaining of methods 
    // firebase
    //   .firestore()     //Since the data is stored in the firestore
    //   .collection('products') //gets the reference of the products collection from the firebase
    //   .get()
    //   .then((snapshot) => {     //
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {   //docs is an array
    //       console.log(doc.data());    //data gives all the fields in the document as an object 
    //     }); 
        
    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();   //doc.data() returns an object

    //       data.id = doc.id;
    //       return data;     
    //     });

    //     this.setState({
    //       products,
    //       loading: false
    //     })
    //   })

    this.db     
      .collection('products') 
      .onSnapshot((snapshot) => {      //onSnapshot is called whenever something is changed/updated in the firebase collection 
        snapshot.docs.map((doc) => {   
          //console.log(doc.data());  
          return ''; 
        }); 
        
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();   

          data['id'] = doc.id;
          return data;     
        });

        this.setState({
          products,
          loading: false
        })
      })
  }

  handleIncreaseQuantity = (product) => {
    //Side Note
    /**
     * product has the reference of the product whose quantity has to be increased but we cant simply do 
     * product.qty += 1;

      this.setState({
          product
      })
     * This will just increase the value of qty externally but won't change it in firebase
     * Its just like var arr = [1,2,3,4,5]
     * var num = arr[1] + 1;
     * this changes the value of num and not arr[1] in the array 
     */


      const {products} = this.state;
      const index = products.indexOf(product);
      // products[index].qty += 1;
      // this.setState({
      //     //products: products
      //     products
      // })

      //Gets the refrence of the doc that has to be updated
      const docRef = this.db.collection('products').doc(products[index].id);   //.doc() gets the particular document whos id had been passed
      docRef
        .update({
          qty: products[index].qty + 1
        })
        .then(() => {
          console.log("updated successfully")
        })
        .catch((error) => {
          console.log('Error: ', error)
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
      // products[index].qty -= 1;
      // this.setState({
      //     //products: products
      //     products
      // }) 

      const docRef = this.db.collection('products').doc(products[index].id);   //.doc() gets the particular document whos id had been passed
      docRef
        .update({
          qty: products[index].qty - 1
        })
        .then(() => {
          console.log("updated successfully")
        })
        .catch((error) => {
          console.log('Error: ', error)
        })
  }

  handleDeleteProduct = (id) => {
      const {products} = this.state;

      // //const productsUpdated = products.filter((product) => product.id !== id);
      // //setState only re-renders the updated elements of the components 
      // this.setState({
      //     products: productsUpdated
      // })

      const docRef = this.db.collection('products').doc(id);

      docRef
        .delete()
        .then(() => {
          console.log("Deleted successfully")
        })
        .catch((error) => {
          console.log('Error: ', error)
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

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        title: "PC",
        qty: 1,
        price: 50000,
        img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      })
      .then((docRef) => {   //docRef is the reference of the object added above to the collection
        console.log( "product has been added: " ,docRef);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
  }

  render() {
    const {products, loading} = this.state;
    return(
      <div className="App"> 
        <Navbar count={this.getCartCount()}/>
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1> Loading products ... </h1>}
        <div style={{padding: 10, fontSize: 20}}> TOTAL : {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
