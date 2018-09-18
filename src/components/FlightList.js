import React, {Component} from 'react'
import FlightArr from './Arrival/index'
import FlightDep from './Departure/index'
import flightsInfoArr from './Arrival/ListArr16'
import flightsInfoDep from './Departure/ListDep'
import InputLiveSearch from "./InputLiveSearch";
//import Example from './Auto';


class FlightList extends Component{

    state = {
        val:'',
        isGoing: false
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(event) {
        this.setState({val: event.target.value});
    }

    handleInputChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
        // console.log('handleInputChange',value);
    }

    render(){
        const {isDeparture} = this.props;

        // console.log('isDeparture',isDeparture);
        /**Подготовка информации для запроса*/
        let airport = 'SVO';
        let arr_dep = ['arr','dep'];
        let monthFull=['01','02','03','04','05','06','07','08','09','10','11','12'];
        let dateFull=['00','01','02','03','04','05','06','07','08','09','10',
            '11','12','13','14','15','16','17','18','19','20',
            '21','22','23','24','25','26','27','28','29','30',
            '31'];
        let date = new Date();
        let setTime = [
            date.getUTCFullYear(),
            monthFull[date.getUTCMonth()],
            dateFull[date.getUTCDate()],
            dateFull[date.getUTCHours()]
        ];
        let appId = 'c94f5080';
        let appKey = 'b5bda98edd70d3704331778613e20487';
        let deltaTime = '2';


        /**Запрос информации о прибытии*/
        let flightsArrFull = {};
        let requestURLArr=  'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/'
                                +airport+'/'
                                +arr_dep[0]+'/'
                                +setTime[0]+'/'
                                +setTime[1]+'/'
                                +setTime[2]+'/'
                                +setTime[3]+'?appId='
                                +appId+'&appKey='
                                +appKey+'&utc=true&numHours='
                                +deltaTime;
        // let requestURLARR = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/SVO/arr/2018/09/16/17?appId=c94f5080&appKey=b5bda98edd70d3704331778613e20487&utc=true&numHours=1';
        // console.log('requestURLArr',requestURLArr);
        let request = new XMLHttpRequest();
        request.open('GET', requestURLArr, false);
        request.onload = function() {
            /**Зарубили!!!!*/
            //flightsArrFull = JSON.parse(request.response);
            flightsArrFull=flightsInfoArr;
        };
        request.send();
        /**Зарубили!!!!*/
        //flightsArrFull=JSON.parse(flightsInfoArr);

        /**Запрос информации о вылете*/
        let flightsDepFull = {};
        let requestURLDep=  'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/'
            +airport+'/'
            +arr_dep[1]+'/'
            +setTime[0]+'/'
            +setTime[1]+'/'
            +setTime[2]+'/'
            +setTime[3]+'?appId='
            +appId+'&appKey='
            +appKey+'&utc=true&numHours='
            +deltaTime;

        let requestDep = new XMLHttpRequest();
        requestDep.open('GET', requestURLDep, false);
        requestDep.onload = function() {
            /**Зарубили!!!!*/
            //flightsDepFull = JSON.parse(requestDep.response);
            flightsDepFull=flightsInfoDep;
        };
        requestDep.send();
        /**Зарубили!!!!*/
        //flightsDepFull=JSON.parse(flightsDepFull);

        /**Сортировка по времени прибытия*/
        function compareTimeArr(a,b) {
            return Date.parse(a.arrivalDate.dateLocal)-Date.parse(b.arrivalDate.dateLocal);
        }
        flightsArrFull.flightStatuses.sort(compareTimeArr);

        /**Сортировка по времени вылета*/
        function compareTimeDep(a,b) {
            return Date.parse(a.departureDate.dateLocal)-Date.parse(b.departureDate.dateLocal);
        }
        flightsDepFull.flightStatuses.sort(compareTimeDep);

        /**Обработка входящих параметров*/

        let dataSearchArr=[];
        let inputNumb = this.state.val;
        let inputCheck=this.state.isGoing;
        let listDep = isDeparture;
        console.log('inputNumb,inputCheck,listStatus',inputNumb,inputCheck,listDep);
        let data=[];
        let dataFirst=[];
        function GlobalListOperator() {
            if (listDep){
                if (inputCheck){
                    if(inputNumb.length!==0){//1
                     for (let i=0; i<flightsDepFull.flightStatuses.length;i++)
                        {
                         if (flightsDepFull.flightStatuses[i].delays!==undefined){
                             if (flightsDepFull.flightStatuses[i].delays.departureGateDelayMinutes!==undefined){
                                 dataFirst.push(flightsDepFull.flightStatuses[i]);
                             }

                         }
                        }
                     for (let i=0; i<dataFirst.length;i++){
                         if (dataFirst[i].flightNumber.includes(inputNumb)){
                             data.push(dataFirst[i]);
                         }
                     }
                    }
                    else {//2
                        for (let i=0; i<flightsDepFull.flightStatuses.length;i++)
                        {
                            if (flightsDepFull.flightStatuses[i].delays!==undefined){
                                if (flightsDepFull.flightStatuses[i].delays.departureGateDelayMinutes!==undefined) {
                                    data.push(flightsDepFull.flightStatuses[i]);
                                }
                            }
                        }
                    }
                }
                else {
                    if(inputNumb.length!==0){//3
                        for (let i=0; i<flightsDepFull.flightStatuses.length;i++){
                            if (flightsDepFull.flightStatuses[i].flightNumber.includes(inputNumb)){
                                data.push(flightsDepFull.flightStatuses[i]);
                            }
                        }
                    }
                    else {//4
                        for (let i=0; i<flightsDepFull.flightStatuses.length;i++){
                                data.push(flightsDepFull.flightStatuses[i]);
                        }
                    }

                }
            }
            else {
                if (inputCheck){
                    if(inputNumb.length!==0){//5
                        for (let i=0; i<flightsArrFull.flightStatuses.length;i++)
                        {
                            if (flightsArrFull.flightStatuses[i].delays!==undefined){
                                if (flightsArrFull.flightStatuses[i].delays.arrivalGateDelayMinutes!==undefined) {
                                    dataFirst.push(flightsArrFull.flightStatuses[i]);
                                }
                            }
                        }
                        for (let i=0; i<dataFirst.length;i++){
                            if (dataFirst[i].flightNumber.includes(inputNumb)){
                                data.push(dataFirst[i]);
                            }
                        }
                    }
                    else {//6
                        for (let i=0; i<flightsArrFull.flightStatuses.length;i++)
                        {
                            if (flightsArrFull.flightStatuses[i].delays!==undefined){
                                if (flightsArrFull.flightStatuses[i].delays.arrivalGateDelayMinutes!==undefined) {
                                    data.push(flightsArrFull.flightStatuses[i]);
                                }
                            }
                        }
                    }
                }
                else {
                    if(inputNumb.length!==0){//7
                        for (let i=0; i<flightsArrFull.flightStatuses.length;i++){
                            if (flightsArrFull.flightStatuses[i].flightNumber.includes(inputNumb)){
                                data.push(flightsArrFull.flightStatuses[i]);
                            }
                        }
                    }
                    else {//8
                        for (let i=0; i<flightsArrFull.flightStatuses.length;i++){
                            data.push(flightsArrFull.flightStatuses[i]);
                        }
                    }

                }
            }
        }
        GlobalListOperator();
        console.log('---DATA----',data);


        function fDataSearchArr() {
            for (let i=0; i<flightsArrFull.flightStatuses.length;i++){
                let data_flightNumber=flightsArrFull.flightStatuses[i].flightNumber;
                if (data_flightNumber.includes(inputNumb)){
                    dataSearchArr.push(flightsArrFull.flightStatuses[i]);
                }
            }
        }
        fDataSearchArr();

        let dataSearchDep=[];
        function fDataSearchDep() {
            for (let i=0; i<flightsDepFull.flightStatuses.length;i++){
                let data_flightNumber=flightsDepFull.flightStatuses[i].flightNumber;
                if (data_flightNumber.includes(inputNumb)){
                    dataSearchDep.push(flightsDepFull.flightStatuses[i]);
                }
            }
        }
        fDataSearchDep();


        // function fDataFlyDalayDep() {
        //     /**Здесь надо влупить СУУУПЕР функцию!!!!*/
        //     for (let i=0; i<flightsDepFull.flightStatuses.length;i++){
        //                 if (flightsDepFull.flightStatuses[i].delays!==undefined){
        //                     dataFlyDalayDep.push(flightsDepFull.flightStatuses[i]);
        //                 }
        //             }
        // }
        //
        // function fDataFlyDalayArr() {
        //     /**Здесь надо влупить СУУУПЕР функцию!!!!*/
        //     for (let i=0; i<flightsArrFull.flightStatuses.length;i++){
        //         if (flightsArrFull.flightStatuses[i].delays!==undefined){
        //             dataFlyDalayArr.push(flightsArrFull.flightStatuses[i]);
        //         }
        //     }
        // }


        const inputNumber=<input className="form-control-lg" style={{width:'100%', marginBottom:'10px'}} type="text"
            placeholder="Search by flight number or city..." onChange={this.handleChange} value={this.state.val}/>;


        const checkBox=<input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />;

        /**Формирование данных для child*/
        // const flightElements = (isDeparture)?
        //     flightsDepFull.flightStatuses.map((flightsDepFull_flightStatuses, index) =>
        //         <tr className='list-group-item' key={index}><FlightDep flightsDepFull_flightStatuses = {flightsDepFull_flightStatuses} flightsDepFull={flightsDepFull}/></tr>):
        // flightsArrFull.flightStatuses.map((flightsArrFull_flightStatuses, index) =>
        //     <tr className='list-group-item' key={index}><FlightArr flightsArrFull_flightStatuses = {flightsArrFull_flightStatuses} flightsArrFull={flightsArrFull} /></tr>);

        const flightElements = (isDeparture)?
            dataSearchDep.map((dataSearchDep, index) =>
                <tr className='list-group-item' key={index}><FlightDep flightsDepFull_flightStatuses = {dataSearchDep} flightsDepFull={flightsDepFull}/></tr>):

            dataSearchArr.map((dataSearchArr, index) =>
                <tr className='list-group-item' key={index}><FlightArr flightsArrFull_flightStatuses = {dataSearchArr} flightsArrFull={flightsArrFull} /></tr>);


        const dataFlight = (isDeparture)? data.map((data,index) =>
            <tr className='list-group-item' key={index}><FlightDep flightsFull_flightStatuses = {data} flightsDepFull={flightsDepFull}/></tr>):
            data.map((data,index) =>
                <tr className='list-group-item' key={index}><FlightArr flightsFull_flightStatuses = {data} flightsArrFull={flightsArrFull} /></tr>);

        return(
            <div>
                {inputNumber}
                {checkBox}
            <tbody>
            {/*{flightElements}*/}
            {dataFlight}
            </tbody>

            </div>
        )
    }

}

export default FlightList