const GOOGLE_API_KEY = "AIzaSyBSz9oqHd19uT1u2TLAK5oU0niFKN6Rgw8";

const BASE_URL = `https://www.google.com/maps/embed/v1`;

function MapDisplay({ searchParam }) {
  const mapZoom = 12;
  const mapCenter = `${searchParam.lat},${searchParam.lon}`;

  const mapURL = `${BASE_URL}/view?key=${GOOGLE_API_KEY}&center=${mapCenter}&zoom=${mapZoom}`;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        title="Weather Map "
        width="690"
        height="500"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src={mapURL}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MapDisplay;
