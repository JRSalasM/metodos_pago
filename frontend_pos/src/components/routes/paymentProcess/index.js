import React, { Component } from 'react'
import Axios from 'axios';


export default class index extends Component {

    state = {
        data: false
    }

    componentDidMount(){
        this.props.clearCart();
        Axios.get(`${this.props.urlApi}/api/payment/getPayment_niubiz/${this.props.match.params.id}`)
        .then((res) => {
            console.log(res)
            let data = res.data;
            data.data_payment = JSON.parse(JSON.parse(data.data_payment))
            this.setState({data})
        })
        .catch((err) => {
            console.log(err);
        })
    }
    renderResponse = () => {
        if(this.state.data.data_payment.dataMap){
            let {dataMap, order} = this.state.data.data_payment;
            if(dataMap.ACTION_CODE=="000"){
                return(
                    <div>
                        <div className="alert alert-success" role="alert">
                            {dataMap.ACTION_DESCRIPTION}
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <b>Tarjeta: </b> {dataMap.BRAND}
                            </div>
                            <div className="col-md-12">
                                <b>Importe pagado: </b> {order.amount}
                            </div>
                        </div>
                    </div>
                )
            }
            return  '';
        }else{
            let {data} = data.data_payment;
            return(
                <div>
                    <div className="alert alert-danger" role="alert">
                        {data.ACTION_DESCRIPTION}
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <b>Tarjeta: </b> {data.CARD} - {data.BRAND}
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        let {data} = this.state;
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        {
                            data&&
                            (
                                this.renderResponse() 
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
