import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import Home from './home'
import ShoppingCart from './shoppingCart'
import Payment from './payment';
import PaymentProcess from './paymentProcess';
import { v4 as uuidv4 } from 'uuid';
let urlApi = 'http://localhost:3100'
//urlApi = 'http://cd2b3f8e.ngrok.io'

class Routes extends React.Component {

  state = {
    items: [],
    total: 0
  }

  componentDidMount(){
    this.loadItems();
  }

  loadItems = () => {
    let items = localStorage.getItem('items');
    let total = 0;
    if(items){
      items = JSON.parse(items)
      items.forEach((v) => {
        total += v.total;
      })
      this.setState({items, total});
    }
  }

  clearCart = () => {
    this.setState({
      items: [],
      total: 0,
    }, () => {
      localStorage.setItem('items', JSON.stringify([]))
    })    
  }

  handleAddItems = (item) => {
    let items = localStorage.getItem('items');
    let total = 0;
    if(items){
      items = JSON.parse(items)

      let ii = items.findIndex(e => e.id === item.id);
      if(ii !== -1){
        items[ii].quantity = items[ii].quantity + 1;
        items[ii].total = item.price * items[ii].quantity;
      }else{
        items.push(Object.assign(item,{idCart: uuidv4(), quantity: 1, total: item.price}));
      }

      items.forEach((v) => {
        total += v.total;
      })
      this.setState({items, total}, () => {
        localStorage.setItem('items', JSON.stringify(items))
      });
    }else{
      items = [];
      items.push(Object.assign(item,{idCart: uuidv4(), quantity: 1, total: item.price}));
      items.forEach((v) => {
        total += v.total;
      })
      this.setState({items, total}, () => {
        localStorage.setItem('items', JSON.stringify(items))
      });
    }
  }

  handleDeleteItem = (idCart) => {
    let items = localStorage.getItem('items');
    let total = 0;
    if(items){
      items = JSON.parse(items)
      items = items.filter(e => e.idCart !== idCart);
      items.forEach((v) => {
        total += v.total;
      })
      this.setState({items, total}, () => {
        localStorage.setItem('items', JSON.stringify(items))
      });
    }
  }

  render(){
    let {items, total} = this.state;
    return (
      <BrowserRouter>
        <NavBar items={items}/>
        <Switch>
          <Route
              exact
              path="/"
              activeClassName="active"
              //component={PlanillaReport}
              render={
                  (props) => (
                      <Home
                          {...props}
                          addItems={this.handleAddItems}
                          urlApi={urlApi}
                      />
                  )
              }
          />
          <Route
              exact
              path="/shopping-cart"
              activeClassName="active"
              //component={PlanillaReport}
              render={
                  (props) => (
                      <ShoppingCart
                        {...props}
                        items={items}
                        deleteItem={this.handleDeleteItem}
                        total={total}
                      />
                  )
              }
          />
          <Route
              exact
              path="/payment"
              activeClassName="active"
              //component={PlanillaReport}
              render={
                  (props) => (
                      <Payment
                        {...props}
                        items={items}
                        total={total}
                        clearCart={this.clearCart}
                        urlApi={urlApi}
                      />
                  )
              }
          />
          <Route
              exact
              path="/payment/:id"
              activeClassName="active"
              //component={PlanillaReport}
              render={
                  (props) => (
                      <PaymentProcess
                        {...props}
                        clearCart={this.clearCart}
                        urlApi={urlApi}
                      />
                  )
              }
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes;
