import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar(props) {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to={'/'}>Punto de venta</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={'/shopping-cart'}>
                            <i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                            <span className="badge badge-primary">{props.items.length}</span>
                        </Link>                        
                    </li>
                </ul>
            </div>
        </nav>
    )
}
