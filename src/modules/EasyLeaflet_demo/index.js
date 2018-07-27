import React from 'react'
import k, { Legend, Popup } from '../../component/EasyLeaflet'

import Detail from './popup'

export default class maptest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layoutState: false,
            layoutIndex: 1,
            visible: false,
            info: null,
        }
    }
    markerData
    layoutData
    map = null;
    pageH = document.documentElement.clientHeight || document.body.clientHeight;
    pageW = document.documentElement.clientWidth || document.body.clientWidth;;
    map = null;

    componentDidMount() {
        this.map = k.init('mapBox', 'dxt', {
            center: [39.90123456789, 116.2987654321],
            crs: L.CRS.EPSG3857,
            zoom: 15,
            dragging: true,
            zoomControl: false,
            attributionControl: false,
            latlngControl: false,
            zoomSnap: 0
        });

        setTimeout(() => {
            this.map.on('moveend', e => {
                console.log(this.map.getCenter())
                this.setState({ visible: true, info: this.map.getCenter() });
            })
        }, 1000);

        k.e.zoomIn()
    }

    handleBack = () => this.setState({ visible: false });

    render() {
        const { info, visible } = this.state;

        return (
            <div id='mapBox' style={{ height: this.pageH }}>
                <Popup>
                    <img src='../../assets/easyLeaflet/defaultIcon.png' style={{ position: 'absolute', top: this.pageH / 2 - 48, left: this.pageW / 2 - 24 }} />

                    <Detail visible={ visible } info={ info } onBack={ this.handleBack } />
                </Popup>
            </div>
        )
    }
}