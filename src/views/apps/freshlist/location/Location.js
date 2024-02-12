import React from "react";
import GoogleMapReact from 'google-map-react';
import "../../../../assets/css/main.css"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// export default function Location() {
//     // eslint-disable-next-line no-unused-vars
//     const defaultProps = {
//         center: {
//             lat: 21.125681,
//             lng: 82.79499799999996
//         },
//         zoom: 11
//     };
//     // const handleApiLoaded = (map, maps) => {
//     //     // use map and maps objects
//     // };

//     return (
//         // Important! Always set the container height explicitly
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact

//                 bootstrapURLKeys={{ key: "" }}
//                 defaultCenter={this.props.center}
//                 defaultZoom={this.props.zoom}
//                 yesIWantToUseGoogleMapApiInternals
//             // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//             >
//                 <AnyReactComponent
//                     lat={59.955413}
//                     lng={30.337844}
//                     text="My Marker"
//                 />
//             </GoogleMapReact>
//         </div>
//     );
// }
export class Location extends React.Component {
    render() {
        const mapStyles = {
            width: "100%",
            height: "100%",
        };
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 9.761927, lng: 79.95244 }}
            >
                <Marker position={{ lat: 9.761927, lng: 79.95244 }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "API_KEY",
})(Location);