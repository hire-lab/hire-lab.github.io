import { useContext } from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import './Navigation.css'

export default function Navigation () {
    const {user} = useContext(AuthContext);

    let userNavigation = (
        <ul className="nav navbar-nav navbar-right scroll-to">
            <li className='homeNav'><a>Welcome, {user.name}</a></li>
            <li className='homeNav'><Link to="/jobs">Jobs</Link></li>
            <li className='homeNav'><Link to="/candidates">Candidates</Link></li>
            <li className='homeNav'><Link to="/interviews">Interviews</Link></li>
            <li className='homeNav'><Link to="/logout">Logout</Link></li>                      
        </ul>
    );

    let guestNavigation = (
        <ul className="nav navbar-nav navbar-right scroll-to">
            <li className='homeNav'><Link to="/about">About</Link></li>
            <li className='homeNav'><Link to="/jobs">Jobs</Link></li>
            <li className='homeNav'><Link to="/login">Login</Link></li>
            <li className='homeNav'><Link to="/register">Register</Link></li>                  
        </ul>
    )
    return (
        <nav className="navbar navbar-default navbar-fixed-top before-color">
          <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand alo" to="/">Hire Lab</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                {user.email
                    ? userNavigation
                    : guestNavigation}
            </div>
        </div>
    </nav>
    )
}