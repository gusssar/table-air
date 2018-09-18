import React,{Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './Auto.css'

const flightStatuses = [
    {
        "flightId": 973498596,
        "carrierFsCode": "KC",
        "flightNumber": "123",
        "departureAirportFsCode": "SVO",
        "arrivalAirportFsCode": "ALA",
        "departureDate": '',
        "arrivalDate": '',
        "status": "S",
        "schedule": '',
        "operationalTimes": '',
        "flightDurations": '',
        "airportResources": '',
        "flightEquipment": ''
    },
    {
        "flightId": 973498596,
        "carrierFsCode": "KC",
        "flightNumber": "23",
        "departureAirportFsCode": "SVO",
        "arrivalAirportFsCode": "ALA",
        "departureDate": '',
        "arrivalDate": '',
        "status": "S",
        "schedule": '',
        "operationalTimes": '',
        "flightDurations": '',
        "airportResources": '',
        "flightEquipment": ''
    },
    {
        "flightId": 973498596,
        "carrierFsCode": "KC",
        "flightNumber": "3",
        "departureAirportFsCode": "SVO",
        "arrivalAirportFsCode": "ALA",
        "departureDate": '',
        "arrivalDate": '',
        "status": "S",
        "schedule": '',
        "operationalTimes": '',
        "flightDurations": '',
        "airportResources": '',
        "flightEquipment": ''
    }
];
// const data = this.props.data;
// console.log('data',data);

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log(inputValue);

    return inputLength === 0 ? [] :flightStatuses.filter(flight =>
        flight.flightNumber.toLowerCase().includes(value)
    );

};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.flightNumber;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.flightNumber}
    </div>
);

class Example extends Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search by flight number or city...',
            value,
            onChange: this.onChange
        };


        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default Example