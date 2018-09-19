import React, {Component} from 'react'
import FlightList from '../FlightList/index'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import logo from './img/logo.png'

class App extends Component{

    state = {
        isDeparture: true
    };


    render(){
        const header_title = (this.state.isDeparture)?
            <div className='jumbotron'>
                <div className='my_title my_title_on' onClick={this.departureClick}>Departure</div>
                <div className='my_title'  onClick={this.arrivalClick}>Arrival</div>
            </div>
        :
            <div className='jumbotron'>
                <div className='my_title' onClick={this.departureClick}>Departure</div>
                <div className='my_title my_title_on'  onClick={this.arrivalClick}>Arrival</div>
            </div>;



        const body =<FlightList  isDeparture = {this.state.isDeparture}/>;
        return (
            <div className="container">
                <img className='logo' src={logo} alt={"logo"} />
                {header_title}
                <table className='list-group table-hover'>
               </table>
                {body}
            </div>
        )
    }




    departureClick = () => {
        this.setState({
            isDeparture : true
        })
    };
    arrivalClick = () => {
        this.setState({
            isDeparture : false
        })
    }
}

export default App