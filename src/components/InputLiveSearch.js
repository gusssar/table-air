import React,{Component} from 'react';

class InputLiveSearch extends Component{
    constructor(props){
        super(props);
        const {data} = this.props;
    }

    render(){
        const {search, data, update} = this.props;
        // console.log('---search---',search);
        const dataSearch = event => {
            let dataSearch2=[];
            function dataSearch3() {

                for (let i=0; i<data.length;i++){
                    let data_flightNumber=data[i].flightNumber;
                        if (data_flightNumber.includes(event.target.value)){
                            dataSearch2.push(data[i]);
                        }
                }
            }
            dataSearch3();
            // console.log('---event---',event.target.value);
            // console.log('--dataSearch2--',dataSearch2);
        };





        return (
            <div>
                <input
                    className="form-control-lg"
                    style={{display:'inline-block', width:'90%', marginBottom:'10px'}}
                    type="text"
                    placeholder="Search by flight number or city..."
                    onChange={dataSearch}
                />
                <button onClick={null}
                        style={{display:'inline-block', width:'10%', marginBottom:'10px'}}>
                    Submit
                </button>
            </div>
        );
    }

}

export default InputLiveSearch;