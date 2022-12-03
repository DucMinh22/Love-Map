import * as React from 'react';
import {MapProvider} from 'react-map-gl';
import 'bootstrap/dist/css/bootstrap.min.css';

import Map from './map';
 
export default function App() {
 return (
    <MapProvider>
        <Map />
    </MapProvider>
 )
}