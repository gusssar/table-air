import React, {Component} from 'react'

class FlightDep extends Component{
    render(){
        const {flightsDepFull_flightStatuses, flightsDepFull} = this.props;
        let fullTime = (new Date(flightsDepFull_flightStatuses.departureDate.dateLocal).toTimeString().split(':'));

        /**Перекодировка наименования города*/
        let airFull;
        let airInfo = flightsDepFull;

        for (let i=0; i< airInfo.flightStatuses.length+1; i++){
            if (airInfo.appendix.airports[i].fs === flightsDepFull_flightStatuses.arrivalAirportFsCode){
                airFull = airInfo.appendix.airports[i].city;
                break
            }
        }

        /**Статус вылёта*/

        let fStatus;
        let fullStatus={
            'A':	'Active',
            'C':	'Canceled',
            'D':	'Diverted',
            'DN':	'Data source needed',
            'L':	'Landed',
            'NO':	'Not Operational',
            'R':	'Redirected',
            'S':	'Scheduled',
            'U':	'Unknown'
        };
        for (let key in fullStatus){
            if (key === flightsDepFull_flightStatuses.status){
                fStatus = fullStatus[key];
                break;
            }
        }

        /**Задержка*/

        const delay=(flightsDepFull_flightStatuses.delays===undefined)?'':
            (flightsDepFull_flightStatuses.delays.departureGateDelayMinutes===undefined)?'':
            '+'+flightsDepFull_flightStatuses.delays.departureGateDelayMinutes+'min';

        let term =(flightsDepFull_flightStatuses.airportResources===undefined)?'-': flightsDepFull_flightStatuses.airportResources.departureTerminal;

        const style1 = {height:'10vh', width:'5vw', verticalAlign:'middle', textAlign:'center'};
        const style2 = {height:'10vh', width:'65vw',verticalAlign:'middle', textAlign:'left', paddingLeft:'5vw', fontSize:'4vh', fontWeight:'bold'};
        const style3 = {height:'10vh', width:'10vw', verticalAlign:'middle', textAlign:'center'};
        const style4 = {height:'10vh', width:'10vw', verticalAlign:'middle', textAlign:'left', paddingRight:'1vw', fontWeight:'bold'};
        const style5 = {height:'10vh', width:'10vw', verticalAlign:'middle', textAlign:'left', paddingRight:'1vw'};
        const style6 = {height:'10vh', width:'5vw', verticalAlign:'middle', textAlign:'left', color:'red', opacity:'0.7'};

        return(
            <tr className='table-hover'>
                <td style={style1}>{fullTime[0] + ':' + fullTime[1]}</td>
                <td style={style6}>{delay}</td>
                <td style={style2}>{airFull}</td>
                <td style={style3}>{flightsDepFull_flightStatuses.carrierFsCode} {flightsDepFull_flightStatuses.flightNumber}</td>
                <td style={style4}>{term}</td>
                <td style={style5}>{fStatus}</td>
            </tr>

        )

    }

}

export default FlightDep