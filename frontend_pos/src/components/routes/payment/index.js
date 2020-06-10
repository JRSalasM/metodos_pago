import React, { Component } from 'react'
import currencyFormatter from 'currency-formatter';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default class index extends Component {
    
    state = {
        username: '',
        card_number: '',
        cvv: '',
        expiration_month: '01',
        expiration_year: new Date().getFullYear(),
        email: '',
        loading: false,
        process_payment: true,
        purchaseNumber: Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000,
    }

    componentDidMount(){
        this.payment_niubiz();
    }

    setValue  = (e) => {
        this.setState({[e.name]: e.value})
    }

    payment = () => {
        let { username, card_number, cvv, expiration_month, expiration_year, email} = this.state;
        this.setState({
            loading: true
        }, () => {
            Axios.post(`${this.props.urlApi}/api/payment/payment`, {
                username,
                card_number,
                cvv,
                expiration_month,
                expiration_year,
                email,
                amount: this.props.total
            })
            .then((res) => {
                console.log(res);
                if(res.data.object === 'error'){
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: res.data.user_message || 'Ocurrio un error intentelo denuevo.',
                    })
                    this.setState({loading: false});
                }else{
                    Swal.fire({
                        title: 'Pago exitoso!',
                        text: "El pago fue realizado exitosamente.",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        this.props.clearCart();
                        this.props.history.push('/')
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un error, vuelva a intentarlo!',
                })
                this.setState({loading: false});
            })
        })
    }

    componentWillUnmount(){
        let form = document.getElementById("visaNetWrapper");
        if(form){
            document.body.removeChild(form);
        }
    }

    payment_niubiz = () => {
        this.setState({
            loading: true
        }, () => {
            Axios.post(`${this.props.urlApi}/api/payment/session_niubiz`, {
                amount: this.props.total
            })
            .then((res) => {
                this.renderPayment(res.data);
            })
        });
    }    

    renderPayment = (data) => {
        let script = document.createElement("script");
        script.setAttribute('src', data.script);
        script.setAttribute('data-sessiontoken', data.sessionKey);
        script.setAttribute('data-channel', 'web');
        script.setAttribute('data-merchantid', data.merchantid);
        script.setAttribute('data-merchantlogo', 'https://facturactiva.com/wp-content/uploads/2019/02/facturactiva-logo-ISO-003-1.png');
        script.setAttribute('data-purchasenumber', this.state.purchaseNumber);
        script.setAttribute('data-amount', this.props.total);
        script.setAttribute('data-expirationminutes', '5');
        script.setAttribute('data-timeouturl', 'http://localhost:3000/');
        document.getElementById("form-niubiz").appendChild(script);
    }

    render() {
        let {loading, username, card_number, cvv, expiration_month, expiration_year, email} = this.state;
        return (
            <div className="container mt-3">
                <div className="card">
                    <div  className="card-header text-center">
                        <h3>Proceso de pago</h3>
                    </div>
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="float-left">Monto a pagar</h4>
                                <h4 className="float-right"><strong>{currencyFormatter.format(this.props.total, { code: 'PEN' })}</strong></h4>
                            </div>
                        </div>
                        <div className="card mt-3" style={{'display': 'none'}}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="username">Nombres y apellidos</label>
                                    <input type="text" className="form-control" id="username" name="username" value={username} disabled={loading} onChange={(e) => this.setValue(e.target)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Correo electronico</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} disabled={loading} onChange={(e) => this.setValue(e.target)}/>
                                </div>
                                <div className="row">
                                    <div className="form-group col-4">
                                        <label htmlFor="card_number">Número de tarjeta</label>
                                        <input type="text" className="form-control" id="card_number" name="card_number" maxLength="16" size="16" value={card_number} disabled={loading} onChange={(e) => this.setValue(e.target)}/>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="expiration_month">Mes</label>
                                        <select className="form-control" name="expiration_month" id="expiration_month" value={expiration_month} disabled={loading} onChange={(e) => this.setValue(e.target)}>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="expiration_year">Año</label>
                                        <select className="form-control" name="expiration_year" id="expiration_year" value={expiration_year} disabled={loading} onChange={(e) => this.setValue(e.target)}>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-2">
                                        <label htmlFor="cvv">Cod. seguridad</label>
                                        <input type="text" className="form-control" id="cvv" name="cvv" value={cvv} maxLength="4" size="4" disabled={loading} onChange={(e) => this.setValue(e.target)}/>
                                    </div>
                                    <div id="content-button-payment" className="form-group col-12">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success btn-block"
                                        onClick={this.payment_niubiz}
                                        disabled={loading}
                                    >
                                        Pagar &nbsp;
                                        {
                                            loading ?
                                            <i className="fa fa-spinner fa-spin"></i>:
                                            <i className="fa fa-credit-card" aria-hidden="true"></i>                                                
                                        }
                                    </button>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                        <form 
                            action={`${this.props.urlApi}/api/payment/payment_niubiz?amount=${this.props.total}&purchaseNumber=${this.state.purchaseNumber}`}
                            onSubmit={this.handleSubmit}
                            id="form-niubiz"
                        >
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
