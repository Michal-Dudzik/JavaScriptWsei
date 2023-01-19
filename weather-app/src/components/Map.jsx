import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.google) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Map
					google={this.props.google}
					zoom={12}
					keyboardShortcuts={false}
					disableDoubleClickZoom={true}
					initialCenter={{ lat: 50.04, lng: 20.09 }}></Map>
			</div>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: 'AIzaSyAZCE2qWD5CpaIQDBR2CrASYGkm75Bis70',
})(MapContainer);
