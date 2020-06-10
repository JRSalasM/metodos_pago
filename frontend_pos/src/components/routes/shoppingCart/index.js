import React from 'react'
import currencyFormatter from 'currency-formatter';
import {Link} from 'react-router-dom'

export default function index(props){
    return (
        <div className='container'>
            {
                !!props.items.length ?
                (
                    <>
                        <div className="text-center m-4">
                            <h3>Carrito de compras</h3>
                        </div>
                        <ul className="list-group">
                            {
                                props.items.map((v, i) => {
                                return (
                                    <li key={i} className="list-group-item d-flex row m-0">
                                        <div className="col-2">
                                            <img src={v.image} alt={v.name} className="img-thumbnail" width="50"/>
                                        </div>
                                        <div className="col-4">
                                            <label>{v.name}</label>
                                        </div>
                                        <div className="col-3">
                                            <label>{v.quantity} unid.</label>
                                        </div>
                                        <div className="col-2">
                                            <strong className="float-right mr-5">
                                                {currencyFormatter.format(v.total, { code: 'PEN' })}
                                            </strong>
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-danger btn-sm float-right" onClick={() => props.deleteItem(v.idCart)}>
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </li>
                                )
                                })
                            }
                            <li className="list-group-item d-flex row m-0">
                                <div className="col-2">
                                </div>
                                <div className="col-4">
                                    <label>Total a pagar</label>
                                </div>
                                <div className="col-3">
                                </div>
                                <div className="col-2">
                                    <strong className="float-right mr-5">
                                        {currencyFormatter.format(props.total, { code: 'PEN' })}
                                    </strong>
                                </div>
                                <div className="col-1">
                                </div>
                            </li>
                        </ul>
                        <div className="my-3">
                            <Link to={'/payment'} className="btn btn-outline-primary btn-block">
                                Proceder a pagar
                            </Link>
                        </div>
                    </>
                )
                :
                (
                    <div className="card text-center mt-4">
                        <label className="m-3">No hay productos seleccionado.</label>
                        <div className="m-3">
                            <Link to={'/'} className="btn btn-outline-primary btn-block">
                                Ver productos
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}