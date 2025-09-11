import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom(), {
        duration: 0.8,
      });
    }
  }, [position, map]);

  return null;
};

export default MapController;
``;
