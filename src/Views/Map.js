import React from "react";
import GoogleMapReact from "google-map-react";

export default function Maps(props) {
  const defaultProps = {
    center: { lat: 40.73, lng: -73.93 },
    zoom: 12,
  };

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: props.position.lat, lng: props.position.lng },
      map,
    });
    return marker;
  };

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyD97b1V--mTTGxvKW369X9idQ7hYk6J4og",
          language: "en",
        }}
        defaultCenter={defaultProps.center}
        center={props.position}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      ></GoogleMapReact>
    </div>
  );
}
