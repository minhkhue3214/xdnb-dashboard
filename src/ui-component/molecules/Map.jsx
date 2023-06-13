import React, { useEffect, useRef } from 'react';
import { Map, Marker, FullscreenControl } from 'react-map-gl';
import { IoMdPin } from 'react-icons/io';

function MapCustom({ initialViewState, focus, markers, ...restProps }) {
  const map = useRef();

  useEffect(() => {
    if (map?.current && focus) {
      map.current.flyTo({ center: [focus?.long, focus?.lat], zoom: focus?.zoom || 8 });
    }
  }, [focus, map]);

  return (
    <Map
      ref={map}
      id="map-id"
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: initialViewState?.long,
        latitude: initialViewState?.lat,
        zoom: initialViewState?.zoom || 8
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1Ijoic2FuZ2hoIiwiYSI6ImNsaGV0ZmRieTByZ3AzanA0bmhhdHk1NjEifQ.spO_SkdSwB39JXWDOCgW6w"
      {...restProps}
    >
      {markers.map((marker, index) => (
        <Marker longitude={marker.long} latitude={marker.lat} anchor="bottom" key={index}>
          <IoMdPin color="#4096ff" size={26} />
        </Marker>
      ))}
      <FullscreenControl />
    </Map>
  );
}

export default MapCustom;
