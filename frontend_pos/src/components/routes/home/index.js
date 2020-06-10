import React, { Component } from 'react'
import Axios from 'axios';
import currencyFormatter from 'currency-formatter';

export default class Index extends Component {

    state = {
        products: []
    }    

    componentDidMount(){
        Axios.get(`${this.props.urlApi}/api/product/allProducts`)
        .then((r) => {
            this.setState({products: [...r.data]})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    render() {
        let {products} = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
                    {
                        products.map((v, i) => {
                            return(
                                <div className="col-3" key={i}>
                                    <div className="card">
                                        <img src={v.image} className="card-img-top" alt={v.name}/>
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{v.name}</h5>
                                            <p className="card-text text-right">
                                                <strong>{currencyFormatter.format(v.price, { code: 'PEN' })}</strong>
                                            </p>
                                            <button
                                                type="button" 
                                                className="btn btn-primary btn-block btn-sm"
                                                onClick={() => this.props.addItems(v)}
                                            >
                                                Añadir al carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
