import React from 'react';
import { Map } from '~/ui-component/molecules';
const MapOrganization = ({ focusMarker, places }) => {
  return <Map markers={places} focus={focusMarker} initialViewState={places[0]} />;
};

export default MapOrganization;
