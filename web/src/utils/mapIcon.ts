import Leaflet from 'leaflet';

import markerMapImg from '../assets/images/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: markerMapImg,
  iconSize: [54, 64],
  iconAnchor: [27, 64],
  popupAnchor: [170, 2]
});

export default mapIcon