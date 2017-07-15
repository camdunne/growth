import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PlacesAutoComplete from 'react-places-autocomplete';
import Map from './Map';

class postForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: 40.748817,
      lng: -73.985428,
    };
    this.onChange = address => this.setState({ address });
  }
  componentWillMount() {
    this.geolocation();
  }
  geolocation() {
    const success = (pos) => {
      const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.setState(latLng);
      return latLng;
    };
    const error = (err) => { throw err; };
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  render() {
    const { handleSubmit, pristine, submitting, reset, address, onChangeInput } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">{'title'}</label>
              <div>
                <Field
                  name="title"
                  component="input"
                  type="text"
                  placeholder="job heading"
                />
              </div>
            </div>
            <div>
              <label htmlFor="body">{'job description'}</label>
              <div>
                <Field
                  name="body"
                  component="input"
                  type="text"
                  placeholder="enter job description..."
                />
              </div>
            </div>
            <div>
              <label htmlFor="price">{'Enter hourly wage in USD'}</label>
              <div>
                <Field
                  name="price"
                  component="input"
                  type="number"
                  placeholder="enter hourly wage..."
                />
              </div>
            </div>
            <Map lat={this.state.lat} lng={this.state.lng} />
            <div>
              <label htmlFor="address">{'job location'}</label>
              <div>
                <Field
                  name="address"
                  component={PlacesAutoComplete}
                  inputProps={{
                    value: address,
                    onChange: onChangeInput,
                    name: 'address',
                    type: 'text',
                    placeholder: 'enter job location...',
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={pristine || submitting}
              >
                {'Submit'}
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                {'Clear Values'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'postForm',
})(postForm);
