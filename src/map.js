import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import image from './IMG_3278.JPG';
import avatar from './publicFolder/images/avatar.JPG'
import { faCircleChevronLeft, faCircleChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'

import 'mapbox-gl/dist/mapbox-gl.css';
import { imageStory } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWluaGR1YyIsImEiOiJjbGIyMTYwZmcxaGgyM25xbHlkd2RmeXkyIn0.X8WY8lg2x_1eWmD__sUK6g'; // Set your mapbox token here

export default function MapView() {
  const [viewState, setViewState] = React.useState({
    longitude: 55.40432060628613,
    latitude: 24.83529788695089,
    zoom: 2,
    projection: 'globe'
  });
  const [showPopup, setShowPopup] = React.useState(true);
  const [showNotice, setShowNotice] = React.useState(true);
  const [valueInput, setValueInput] = React.useState("");
  const [error, setError] = React.useState(false);
  const [showModdal, setShowModal] = React.useState(false);
  const [index, setIndex] = React.useState(0)
  const handleChangeInput = (event) => {
    setValueInput(event.target.value)
    if(event.target.value !== 'voyeuchonglam') {
        setError(true);
    } else {
        setError(false);
    }
  }

  React.useEffect(() => {
    if(showModdal) {
        const interval = setInterval(() => {
            if(index >= (imageStory.length - 1)) {
                setIndex(0);
                setShowModal(false);
            } else {
                setIndex(index + 1);
            }
        }, 3000);
        return () => clearInterval(interval);
    }
  }, [index, showModdal]);
  

  return (
    <div className='wrapper'>
        {showNotice && <div className='popup'>
            <div className='main-content' style={{padding: '50px'}}>
                <h3>Chào mừng vợ đã đến với hành trình tìm kiếm đảo thiên đường của chúng mình</h3>
                <div className='form-input'>
                    <div className="form__group field">
                        <input type="input" className="form__field" autoComplete='off' placeholder={"nhập code voyeuchonglam để lên đảo"} style={{color: `${error ? '#fcb045' : '#3ca55c'}`}} onChange={handleChangeInput} value={valueInput} name="name" id='name' required />
                        <label htmlFor="name" className="form__label">Nhập code "voyeuchonglam" để lên đảo</label>
                    </div>
                    <button type="button" disabled={(valueInput === "" || error) ? true : false} className={`${valueInput === "" || error ? 'disabled-btn' : 'btn-search'}`} onClick={() => setShowNotice(false)}>Tìm kiếm</button>
                </div>
                {error && <div style={{ color : '#fcb045', marginTop: '10px'}}>
                        Vợ nhập sai ui, nhập lại mau aaa
                    </div>}
                    <div id="pot"><img src={image} style={{width: '350px', borderRadius: '20px', paddingTop: '80px'}} alt=""/></div>
            </div>
        </div>}
        <Map
        id="mymap"
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        >
            {showPopup && (
            <Popup longitude={55.40432060628613} latitude={24.83529788695089}
                anchor="bottom"
                style={{width: '500px'}}
                onClose={() => setShowPopup(false)}>
                    <div style={{display :'flex', alignItems: 'center', padding: '0 20px'}}>
                        <div className='cover-image-box' onClick={() => setShowModal(true)}>
                            <img src={avatar} className="image-avatar" alt=""/>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>
                                ourparadise_0703
                            </div>
                            <div>Đang theo dõi</div>
                        </div>
                    </div>
                   
            </Popup>)}
            <Marker longitude={55.40432060628613} latitude={24.83529788695089} color="red" />
        </Map>
        {showModdal && <div className="modal-story">
            <div className='container-story'>
                <div className='wrapper-progress'>
                        {imageStory.map((item, index) => (
                             <div className='progress-bar-container' key={index}>
                                 <div className='progress-story'></div>
                             </div>
                        ))}
                </div>
                <div className='btn-remove' onClick={() => {
                    setShowModal(false);
                    // setIndex(0);
                    } }>
                    <FontAwesomeIcon color='white' style={{cursor: 'pointer'}} icon={faXmark} size="lg"/>
                </div>
                <div className='action-button'>
                    <FontAwesomeIcon onClick={() => {
                        if(index === 0) {
                            setIndex(0);
                        } else {
                            setIndex(index - 1);
                        }
                    }} style={{cursor: 'pointer'}} color='#adadad' icon={faCircleChevronLeft} size="lg"/>
                    <FontAwesomeIcon onClick={() => {
                        if(index >= (imageStory.length - 1)) {
                            setIndex(0);
                        } else {
                            setIndex(index + 1);
                        }
                    }} style={{cursor: 'pointer'}} color='#adadad' icon={faCircleChevronRight} size="lg"/>
                </div>
                <img src={require(`${imageStory[index].url}`)} style={{height: '600px'}}  alt="story"/>
            </div>          
        </div>}
    </div>
  );
}