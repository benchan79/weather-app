import React, { useState, useCallback, useEffect, useContext } from "react";
import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF } from "@react-google-maps/api";
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
    latLngBounds: {
      north: 85.0,
      south: -85.0,
      west: -180.0,
      east: 180.0,
    },
    strictBounds: true,
  },
};

function MapDisplay({ weather, searchParam, onSubmit, apiKey, owmKey }) {
  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });
  const ctx = useContext(WeatherContext);
  const [mapCoords, setMapCoords] = useState("");
  const [weatherMapType, setWeatherMapType] = useState("");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isShowMarkers, setIsShowMarkers] = useState(true)


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
          );
        },
        tileSize: new window.google.maps.Size(256, 256),
        maxZoom: 15,
        minZoom: 0,
        name: "Weather",
      })
    );
  };

  useEffect(() => {
    if (map) {
      map.overlayMapTypes.pop();
      let layer = weatherOverlay();
      map.overlayMapTypes.insertAt(0, layer);
    }
    // eslint-disable-next-line
  }, [weatherMapType]);

  useEffect(() => {
    setMapCoords({
      lat: searchParam.lat,
      lng: searchParam.lon,
    });
  }, [searchParam]);

  useEffect(() => {
    setMarkers((current) => [
      ...current,
      {
        lat: searchParam.lat,
        lng: searchParam.lon,
        icon: weather.icon,
        name: weather.name,
        desc: weather.description,
        temp: weather.temp.toFixed(1),
        high: weather.temp_max.toFixed(1),
        low: weather.temp_min.toFixed(1),
        feels_like: weather.feels_like.toFixed(1),
        wind: weather.speed.toFixed(1),
        humidity: weather.humidity.toFixed(1),
      },
    ]);
    console.log(markers)
    // eslint-disable-next-line
  }, [weather]);

  const onMapLoad = useCallback(function callback(map) {
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


  const hideMarkers = () => {
    markers.length !== 0 && setIsShowMarkers(false);
  }

  const showMarkers = () => {
    setIsShowMarkers(true);
    console.log(markers)
  }

  const deleteMarkers = () => {
    setMarkers([]);
    setIsShowMarkers(true);
  }


  if (loadError) return "Error loading maps";
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="overlays-panel">
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
        <button onClick={() => map.overlayMapTypes.pop()}>Clear Overlays</button>
      </div>

      <div className="markers-panel">
        <button onClick={hideMarkers}>
          Hide Markers
        </button>
        <button onClick={showMarkers}>
          Show Markers
        </button>
        <button onClick={deleteMarkers}>
          Delete Markers
        </button>
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
        {isShowMarkers && markers.map((marker, i) => (
          <MarkerF
            key={i}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            onRightClick={() => {
              const newMarkers = [...markers]
              newMarkers.splice(i, 1)
              setMarkers(newMarkers);
            }}
            icon={{
              url: `https://openweathermap.org/img/wn/${marker.icon}@2x.png`,
              anchor: new window.google.maps.Point(40, 40),
              scaledSize: new window.google.maps.Size(80, 80),
            }}
          />
        ))}

        {selected ? (
          <InfoWindowF
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                {selected.name}
              </h2>
              <p>{selected.desc}</p>
              <p>Temperature: {selected.temp} {ctx.isMetric ? "°C" : "°F"}</p>
              <p>Wind speed: {selected.wind} {ctx.isMetric ? "m/s" : "ft/s"}</p>
              <p>Humidity: {selected.humidity}%</p>
              <span role="img" aria-label="weather">
                  <img src={`https://openweathermap.org/img/wn/${selected.icon}@2x.png`} alt="" />
              </span>
            </div>
          </InfoWindowF>
        ) : null}

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
