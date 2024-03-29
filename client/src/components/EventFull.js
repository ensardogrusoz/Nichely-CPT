/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import './css/eventfull.css';
import { Link } from 'react-router-dom';
import req from 'express/lib/request';
import { authenticate } from 'passport';
import AuthButton from '../components/AuthButton';
import  {AuthContext} from '../context/AuthContext';
import Map from './Maps';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

var lat = 0;
var lng = 0;
var name = "blah";
const rsvpNameArray = ['RSVP' , 'Un-RSVP'];
var rsvpValue = 0;



function getUserName(userID){
    // get the users name
    fetch("/api/userName/"+userID)
    .then(res => res.json())
    .then(user => {
        name = user.firstName + " " + user.lastName;
    })
    .catch(err => console.log("API ERROR: ", err));
}

function addToRSVP(eventId, userId)  {

    rsvpValue = (rsvpValue+1)%2;
    console.log(rsvpValue);  


    fetch("/api/events/" + eventId + "/" + userId, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId , eventId: eventId
          }),
      })
      .then(res => {
        res.json()
      })
      .catch(err => {
        console.log("ERROR");
      });


}

function GMap(){
    return (
        <GoogleMap 
            defaultZoom={11} 
            defaultCenter={{lat: lat, lng: lng}}
        >         
            <Marker position={{lat: lat, lng: lng }}></Marker>
        </GoogleMap>
    );
}


function EventFull({ eventName, eventLocation, eventDescription, eventTime, eventDate, relevantInterests, id, longitude,latitude, hostId}) {

    getUserName(hostId);

    lat = latitude;
    lng = longitude;
    let auth = useContext(AuthContext);

    const WrappedMap = withScriptjs(withGoogleMap(GMap));
    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-7 text-left">
                    <h1>{eventName}</h1>
                    <p>{eventDescription} </p>
                    <p>Relevant interests: {relevantInterests} </p>
                    <button className="rsvpbtn btn btn-outline-secondary" onClick={() => addToRSVP(id, auth.user.id)}> {rsvpNameArray[rsvpValue]}</button>
                    <div className="user-info">
                        <div className="row">
                            <div className="col">
                                <h3>Organizer</h3>
                                <p className="user-name"><Link to={"/user/" + hostId}>{name}</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-1">

                </div>
                <div className="col col-lg-4 d-flex justify-content-center">
                    <div className="map">
                        <p>Date: {eventDate}</p>
                        <p>Time: {eventTime}</p>
                        <p>Location: {eventLocation}</p>
                        <div style={{ width: "600px", height: "300px" }}>
                            <WrappedMap
                                googleMapURL = {"https://maps.googleapis.com/maps/api/js?key=AIzaSyB8elomWP1QiWtBxQnatkC986I3ec2dl30&callback=initMap&libraries=&v=weekly"}
                                loadingElement = {<div style={{ height: "100%" }} />}
                                containerElement = {<div style={{ height: "100%" }} />}     
                                mapElement = {<div style={{ height: "100%" }} />}                 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventFull;
