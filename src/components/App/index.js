import React, {Component} from 'react'
import FlightList from '../FlightList/index'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import logo from './img/logo.png'

class App extends Component{

    state = {
        isDeparture: true,
    };


    render(){
        const style = {
            display:'inline-block',
            width:'30vw !important',
            fontSize:'5vw',
            margin: '1vw'
        };

        const body =<FlightList  isDeparture = {this.state.isDeparture}/>;
        return (
            <div className="container">
                <img className='logo' src={logo} alt={"logo"} />
                {/*<h1 className='App-header'>SHEREMETYEVO</h1>*/}

                <div className='jumbotron'>
                    <div className='my_title' style={style} onClick={this.departureClick}>Departure</div>
                    <div className='my_title' style={style} onClick={this.arrivalClick}>Arrival</div>
                </div>
                <table className='list-group table-hover'>
                    {/*{body}*/}
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

// function App() {
//
// }

export default App