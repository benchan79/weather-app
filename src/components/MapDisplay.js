import React, { useState, useCallback, useEffect, useContext } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import WeatherContext from "../contexts/WeatherContext";
// import { mapStyles } from "./mapStyles";

// const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  minZoom: 0,
  restriction: {
    latLngBounds:{
      north: 85.0, 
      south: -85.0, 
      west: -180.0, 
      east: 180.0
    },
    strictBounds : true
  }
};

function MapDisplay({ searchParam, onSubmit, apiKey, owmKey }) {
 
  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });
  const ctx = useContext(WeatherContext);
  const [mapCoords, setMapCoords] = useState("");
  const [weatherMapType, setWeatherMapType] = useState("");
  const [map, setMap] = useState(null);

  const weatherOverlay = () => {
    return (
      weatherMapType && 
      new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          const normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return "";
          }
          return (
            "https://tile.openweathermap.org/map/" +
            weatherMapType +
            "/" +
            zoom +
            "/" +
            normalizedCoord.x +
            "/" +
            normalizedCoord.y +
            ".png?appid=" +
            owmKey
          )
        },
        tileSize: new window.google.maps.Size(256, 256),
        maxZoom: 15,
        minZoom: 0,
        name: "Weather",
      })
    );
  };

  useEffect(() => {
    // Swap overlay types
    if (map) {
      map.overlayMapTypes.pop();
      map.overlayMapTypes.insertAt(0, weatherOverlay());
    }
  // eslint-disable-next-line
  }, [weatherMapType]);

  useEffect(() => {
    setMapCoords({
      lat: searchParam.lat,
      lng: searchParam.lon,
    });
  }, [searchParam]);

  const onMapLoad = useCallback(function callback(map) {
    // map.overlayMapTypes.pop();
    // map.overlayMapTypes.insertAt(0, weatherOverlay());
    setMap(map);
    // Maintain map position when changing weather overlay
    // setMapCoords(map.getCenter());
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMapClick = useCallback(
    (event) => {
      const latlng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      geocoderlatlng(latlng, onSubmit, ctx.isMetric);
    },
    [ctx.isMetric, onSubmit]
  );

  if (loadError) return "Error loading maps";
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="search">
        <button onClick={() => setWeatherMapType("temp_new")}>
          Temperature
        </button>
        <button onClick={() => setWeatherMapType("wind_new")}>
          Wind Speed
        </button>
        <button onClick={() => setWeatherMapType("clouds_new")}>Clouds</button>
        <button onClick={() => setWeatherMapType("precipitation_new")}>
          Precipitation
        </button>
        <button onClick={() => setWeatherMapType("pressure_new")}>
          Sea Level Pressure
        </button>
        <button onClick={() => map.overlayMapTypes.pop()}>Clear</button>
      </div>

      <GoogleMap
        id="map"
        options={options}
        mapContainerStyle={mapContainerStyle}
        center={mapCoords}
        zoom={10}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        
      >
        <MarkerF position={mapCoords} />
      </GoogleMap>
    </>
  );
}

export default MapDisplay;

export function geocoderlatlng(latlng, onSubmit, isMetric) {
  const geocoder = new window.google.maps.Geocoder();
  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        onSubmit({
          name: response.results[0].formatted_address,
          lat: latlng.lat,
          lon: latlng.lng,
          units: isMetric ? "metric" : "imperial",
        });
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

function getNormalizedCoord(coord, zoom) {
  const y = coord.y;
  let x = coord.x;
  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  const tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = ((x % tileRange) + tileRange) % tileRange;
  }
  return { x: x, y: y };
}