import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IntlTelInput from 'react-intl-tel-input'; // eslint-disable-line import/no-extraneous-dependencies

const lookup = callback => {
  const request = new XMLHttpRequest();

  request.addEventListener('load', () => {
    callback(JSON.parse(request.responseText).country);
  });

  request.open('GET', 'https://ipapi.co/json/');
  request.send();
};

function log(...args) {
  console.log(args);
}

class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone1: '',
      phone2: '',
    };
    this.changePhone1 = this.changeHandler.bind(this, 'phone1');
    this.changePhone2 = this.changeHandler.bind(this, 'phone2');
    this.blurHandler1 = this.blurHandler.bind(this, 'phone1');
    this.blurHandler2 = this.blurHandler.bind(this, 'phone2');
    this.selectFlagHandler1 = this.selectFlagHandler.bind(this, 'phone1');
    this.selectFlagHandler2 = this.selectFlagHandler.bind(this, 'phone2');
  }

  changeHandler(name, isValid, value, countryData, number, ext) {
    log(isValid, value, countryData, number, ext);
    this.setState({
      [name]: value,
    });
  }

  blurHandler(name, isValid, value, countryData, number, ext) {
    log(isValid, value, countryData, number, ext);
    this.setState({
      [name]: value,
    });
  }

  selectFlagHandler(
    name,
    currentNumber,
    selectedCountryData,
    fullNumber,
    isValid
  ) {
    log(currentNumber, selectedCountryData, fullNumber, isValid);
    this.setState({
      [name]: currentNumber,
    });
  }

  render() {
    return (
      <div>
        <IntlTelInput
          onPhoneNumberChange={this.changePhone1}
          onPhoneNumberBlur={this.blurHandler1}
          onSelectFlag={this.selectFlagHandler1}
          defaultCountry="auto"
          value={this.state.phone1}
          geoIpLookup={lookup}
          css={['intl-tel-input', 'form-control']}
          format
        />
        <div>
          Phone Number:
          {this.state.phone1}
        </div>

        <IntlTelInput
          onPhoneNumberChange={this.changePhone2}
          onPhoneNumberBlur={this.blurHandler2}
          onSelectFlag={this.selectFlagHandler2}
          defaultCountry="jp"
          value={this.state.phone2}
          css={['intl-tel-input', 'form-control']}
        />
        <div>
          Phone Number:
          {this.state.phone2}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DemoComponent />, document.getElementById('root'));
