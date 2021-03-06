import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import L from 'leaflet';
import dotenv from 'dotenv';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
var x;
var y;
dotenv.config();

// Our main react app is designed here.


const baseUrl = "/app/lookupget";

// Function to get your location
navigator.geolocation.getCurrentPosition(
    function(position){
        
        x = new Number(position.coords.longitude);
        y = new Number(position.coords.latitude);

    },
    function(error){
        console.error("Error code = " + error.code + " - "+ error.message)
    }
);

// Map creation using leaflet

var mymap = L.map('mapid').setView([41.975, 21.464], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVzdHRoZXRpcDIxIiwiYSI6ImNra2sxM3JwYTJqc3IydnBhaWlrN3E1bjQifQ.LGanOz7I1k9meICjgO57uA'
}).addTo(mymap);

var layerG = L.layerGroup().addTo(mymap);

var myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [20, 30],
    iconAnchor: [10, 30],
 
})

// Main react component

class App extends Component {
    constructor(){
        super()
        this.state = {
            buildingType:'',
            locationX:'',
            locationY:''
        }
        this.changeBuildingType = this.changeBuildingType.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeBuildingType(event){
        this.setState({
            buildingType:event.target.value
        })
    }

    // The search event

    onSubmit(event){
        event.preventDefault()
        layerG.clearLayers();
        const lookupComplete = {
            buildingType:this.state.buildingType,
            locationX:x,
            locationY:y
        }

        // Axios post method sending the search data with your location coordinates

        axios.post(baseUrl,lookupComplete)
        .then(function(response){
            
            for(var i=0;i<response.data.length;i++){
                
                var a = response.data[i].["@lon"];
                var b = response.data[i].["@lat"];
                
                var marker = L.marker([b,a],{icon:myIcon}).addTo(layerG);
                marker.bindPopup("<b>"+response.data[i].name+"</b><br>")

            }
        });

        this.setState({
            buildingType:''
        })
    }

    // This is used to render html code 
    
    render(){

        
        return (
            
            <div>
                <div className='container' >
                    <div className='form-div' >
                        <form onSubmit={this.onSubmit}>
                            <input type="text" 
                            placeholder = "please use lowercase letters for search"
                            onChange={this.changeBuildingType}
                            value={this.state.buildingType}
                            className='form-control form-group'
                            />
                            <input type="submit" className='btn btn-danger btn-block'value='Submit' />
                        </form>
                    </div>
                    
                </div>
            </div>
         ) ; 
    }
}

export default App;