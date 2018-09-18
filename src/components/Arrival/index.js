import React, {Component} from 'react'
import flightsInfo from './ListArr16'

class FlightArr extends Component{
    render(){
        const {flightsFull_flightStatuses, flightsArrFull, updateData} = this.props;
        let flightsArrFull_flightStatuses=flightsFull_flightStatuses;
        // console.log('---flightsArrFull_flightStatuses---',flightsArrFull_flightStatuses);
        let fullTime = (new Date(flightsArrFull_flightStatuses.arrivalDate.dateLocal).toTimeString().split(':'));
        let air = flightsArrFull_flightStatuses.departureAirportFsCode;

        /**Перекодировка наименования города*/
        let airFull;
        let airInfo = flightsArrFull;
        console.log('flightsArrFull',airInfo);
            for (let i=0; i< airInfo.flightStatuses.length+1; i++){
                if (airInfo.appendix.airports[i].fs === air){
                    airFull = airInfo.appendix.airports[i].city;
                    break
                }
            }


        /**Статус прилёта*/

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
            if (key === flightsArrFull_flightStatuses.status){
                fStatus = fullStatus[key];
                break;
            }
        }

        /**Задержка*/

        const delay=(flightsArrFull_flightStatuses.delays===undefined)?'':
            flightsArrFull_flightStatuses.delays.arrivalGateDelayMinutes;



        let term =(flightsArrFull_flightStatuses.airportResources===undefined)?'-': flightsArrFull_flightStatuses.airportResources.arrivalTerminal;


        const style1 = {height:'10vh', width:'5vw', verticalAlign:'middle', textAlign:'center'};
        const style2 = {height:'10vh', width:'75vw',verticalAlign:'middle', textAlign:'left', paddingLeft:'5vw', fontSize:'4vh', fontWeight:'bold'};
        const style3 = {height:'10vh', width:'10vw', verticalAlign:'middle', textAlign:'center'};
        const style4 = {height:'10vh', width:'10vw', verticalAlign:'middle', textAlign:'left', paddingRight:'1vw', fontWeight:'bold'};
        const style5 = {height:'10vh', width:'10vw', verticalAlign:'middle', textAlign:'left', paddingRight:'1vw'};

        return(
            <div className='table-hover'>
                <td style={style1}>{fullTime[0] + ':' + fullTime[1]}</td>
                <td style={style1}>{delay}</td>
                <td style={style2}>{airFull}</td>
                <td style={style3}>{flightsArrFull_flightStatuses.carrierFsCode} {flightsArrFull_flightStatuses.flightNumber}</td>
                <td style={style4}>{term}</td>
                <td style={style5}>{fStatus}</td>
            </div>

        )

    }

}

export default FlightArr