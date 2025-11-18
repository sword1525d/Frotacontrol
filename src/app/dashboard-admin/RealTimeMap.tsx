// src/app/dashboard-admin/RealTimeMap.tsx
'use client';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { type LocationPoint } from './page';
import { useEffect } from 'react';

// Corrige o problema do ícone padrão do Leaflet com o Webpack
const truckIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Componente para ajustar o mapa para caber todos os pontos
const FitBounds = ({ points }: { points: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      map.fitBounds(points);
    }
  }, [points, map]);
  return null;
};

interface RealTimeMapProps {
  locationHistory: LocationPoint[];
}

const RealTimeMap = ({ locationHistory }: RealTimeMapProps) => {
  if (!locationHistory || locationHistory.length === 0) {
    return (
        <div className="flex items-center justify-center h-full bg-muted rounded-lg">
            <p className="text-muted-foreground">Sem dados de localização para exibir.</p>
        </div>
    );
  }

  const polyline: [number, number][] = locationHistory.map(p => [p.latitude, p.longitude]);
  const lastPosition = polyline[polyline.length - 1];

  return (
    <MapContainer
      center={lastPosition}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={polyline} color="blue" />
      <Marker position={lastPosition} icon={truckIcon} />
      <FitBounds points={polyline} />
    </MapContainer>
  );
};

export default RealTimeMap;
