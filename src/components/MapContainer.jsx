import React, { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Info, ExternalLink, HelpCircle } from "lucide-react";
import { PLACES_DATA, NAGPUR_START_POINTS } from "../data/places";

export default function MapContainer({ selectedPlaceId, onResetSelectedPlace }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const routePolylineRef = useRef(null);

  const [startPointId, setStartPointId] = useState("railway");
  const [activeDestinationId, setActiveDestinationId] = useState(selectedPlaceId || null);
  const [distanceInfo, setDistanceInfo] = useState(null);

  // Sync activeDestinationId with prop selectedPlaceId
  useEffect(() => {
    if (selectedPlaceId) {
      setActiveDestinationId(selectedPlaceId);
    }
  }, [selectedPlaceId]);

  // Haversine Distance Formula (km)
  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    // Add routing deviation factor of 1.25 to simulate road path curves
    return Math.round(d * 1.25 * 10) / 10;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!window.L) {
      console.error("Leaflet.js library not loaded yet.");
      return;
    }

    const L = window.L;

    // Create map if it doesn't exist
    if (!mapInstanceRef.current) {
      // Center of Nagpur
      mapInstanceRef.current = L.map("map-element", {
        center: [21.1458, 79.0831],
        zoom: 11,
        zoomControl: true,
        attributionControl: false
      });

      // Use sleek dark-mode tiles (CartoDB Dark Matter)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Create custom icon markers
    const createCustomIcon = (color, size = 30) => {
      return L.divIcon({
        className: "custom-map-marker",
        html: `<div style="
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid white;
          box-shadow: 0 0 10px ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 10px;
        "><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size]
      });
    };

    // Plot Travel Spots
    PLACES_DATA.forEach((place) => {
      const isDestinationActive = place.id === activeDestinationId;
      const markerColor = isDestinationActive ? "var(--color-accent)" : "#3b82f6";
      
      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: createCustomIcon(markerColor, isDestinationActive ? 36 : 28)
      }).addTo(map);

      // Popup content
      const popupHtml = `
        <div style="font-family: var(--font-body); padding: 8px; width: 200px;">
          <h4 style="margin: 0 0 4px 0; color: var(--text-primary); font-size: 0.95rem; font-weight: 700;">${place.name}</h4>
          <span style="font-size: 0.72rem; color: var(--color-accent-hover); font-weight: 600; text-transform: uppercase;">${place.category}</span>
          <p style="margin: 6px 0; color: var(--text-secondary); font-size: 0.8rem; line-height: 1.4;">${place.shortDescription}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
            <span style="font-size: 0.75rem; font-weight: 600; color: white;">🚗 ${place.distanceFromCenter} km</span>
            <a href="https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent-hover); font-size: 0.72rem; font-weight: bold; display: flex; align-items: center; gap: 2px;">
              Directions <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on("click", () => {
        setActiveDestinationId(place.id);
      });

      markersRef.current[place.id] = marker;
    });

    // Plot Start Point
    const startPoint = NAGPUR_START_POINTS.find((p) => p.id === startPointId);
    if (startPoint) {
      const startMarker = L.marker([startPoint.lat, startPoint.lng], {
        icon: L.divIcon({
          className: "start-marker",
          html: `<div style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--color-success);
            border: 2px solid white;
            box-shadow: 0 0 12px var(--color-success);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 19-9-9 19-2-8-8-2Z"/></svg></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map);

      markersRef.current["start_loc"] = startMarker;
      startMarker.bindPopup(`<strong style="font-family: var(--font-body); font-size: 0.85rem; color: var(--color-success);">📍 Start: ${startPoint.name}</strong>`);
    }

    // Cleanup on unmount
    return () => {
      // Don't fully remove map here to prevent re-instantiation lag,
      // but clear markers. We handle full cleanup at parent if required.
    };
  }, [startPointId, activeDestinationId]);

  // Update Route Polyline and calculations
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = window.L;
    const map = mapInstanceRef.current;

    // Clear existing route line
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    const startLoc = NAGPUR_START_POINTS.find((p) => p.id === startPointId);
    const destLoc = PLACES_DATA.find((p) => p.id === activeDestinationId);

    if (startLoc && destLoc) {
      const startLatLng = [startLoc.lat, startLoc.lng];
      const destLatLng = [destLoc.lat, destLoc.lng];

      // Draw polyline
      routePolylineRef.current = L.polyline([startLatLng, destLatLng], {
        color: "var(--color-accent)",
        weight: 4,
        opacity: 0.8,
        dashArray: "8, 8",
        lineCap: "round"
      }).addTo(map);

      // Fit bounds to fit route
      const bounds = L.latLngBounds([startLatLng, destLatLng]);
      map.fitBounds(bounds, { padding: [50, 50] });

      // Calculate driving distance and estimate time
      const dist = calculateHaversineDistance(startLoc.lat, startLoc.lng, destLoc.lat, destLoc.lng);
      // Average speed: 45 km/h
      const mins = Math.round((dist / 45) * 60);
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      
      setDistanceInfo({
        distance: dist,
        time: hours > 0 ? `${hours} hr ${remainingMins} mins` : `${remainingMins} mins`,
        destinationName: destLoc.name
      });

      // Auto open popup for destination
      if (markersRef.current[activeDestinationId]) {
        markersRef.current[activeDestinationId].openPopup();
      }
    } else {
      setDistanceInfo(null);
      // Reset view to Nagpur center
      map.setView([21.1458, 79.0831], 11);
    }
  }, [startPointId, activeDestinationId]);

  const activeDestination = PLACES_DATA.find((p) => p.id === activeDestinationId);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", height: "600px" }} className="animate-fade-in">
      {/* Map Column */}
      <div className="glass-panel" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
        {/* Leaflet Mount Container */}
        <div id="map-element" style={{ width: "100%", height: "100%" }} />

        {/* Legend Overlay */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          zIndex: 1000,
          background: "rgba(10, 14, 20, 0.85)",
          backdropFilter: "blur(4px)",
          border: "1px solid var(--glass-border)",
          padding: "10px 14px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          pointerEvents: "none",
          fontSize: "0.78rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--color-success)", display: "inline-block" }} />
            <span>Starting Location</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
            <span>Hidden Gem (Spot)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--color-accent)", display: "inline-block" }} />
            <span>Selected Destination</span>
          </div>
        </div>
      </div>

      {/* Control Panel Column */}
      <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px", height: "100%", overflowY: "auto" }}>
        <div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px" }}>Route Planner</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            Select starting point and destination to find distances and driving times.
          </p>
        </div>

        {/* Start Point Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>
            1. Select Starting Point
          </label>
          <select
            value={startPointId}
            onChange={(e) => setStartPointId(e.target.value)}
            className="glass-input"
            style={{ width: "100%", cursor: "pointer", background: "rgba(10, 14, 20, 0.9)" }}
          >
            {NAGPUR_START_POINTS.map((pt) => (
              <option key={pt.id} value={pt.id} style={{ background: "var(--bg-secondary)" }}>
                📍 {pt.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>
            2. Choose Hidden Gem
          </label>
          <select
            value={activeDestinationId || ""}
            onChange={(e) => {
              const val = e.target.value;
              setActiveDestinationId(val ? val : null);
              if (!val && onResetSelectedPlace) onResetSelectedPlace();
            }}
            className="glass-input"
            style={{ width: "100%", cursor: "pointer", background: "rgba(10, 14, 20, 0.9)" }}
          >
            <option value="" style={{ background: "var(--bg-secondary)" }}>-- Select Place --</option>
            {PLACES_DATA.map((place) => (
              <option key={place.id} value={place.id} style={{ background: "var(--bg-secondary)" }}>
                🏞️ {place.name} ({place.distanceFromCenter} km)
              </option>
            ))}
          </select>
        </div>

        {/* Route Details Box */}
        {distanceInfo ? (
          <div style={{
            background: "rgba(255, 111, 0, 0.05)",
            border: "1px solid rgba(255, 111, 0, 0.2)",
            borderRadius: "10px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent-hover)" }}>
              <Navigation size={18} />
              <strong style={{ fontSize: "0.9rem" }}>Travel Calculations</strong>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px", fontSize: "0.85rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Estimated Distance:</span>
              <span style={{ fontWeight: "700", color: "white" }}>{distanceInfo.distance} km</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px", fontSize: "0.85rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Driving Time:</span>
              <span style={{ fontWeight: "700", color: "white" }}>{distanceInfo.time}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Route Type:</span>
              <span style={{ fontWeight: "600", color: "var(--color-success)" }}>Optimized Highway</span>
            </div>
          </div>
        ) : (
          <div style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px dashed var(--glass-border)",
            borderRadius: "10px",
            padding: "24px",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem"
          }}>
            <HelpCircle size={24} style={{ margin: "0 auto 8px auto", opacity: 0.5 }} />
            Please select a destination to draw the routing path and calculate metrics.
          </div>
        )}

        {/* Selected Destination Stats */}
        {activeDestination && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
            <h4 style={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)" }}>
              Destination Summary
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.82rem" }}>
              <p style={{ color: "var(--text-primary)", fontWeight: "500" }}>{activeDestination.shortDescription}</p>
              <div style={{ display: "flex", gap: "6px", color: "var(--text-secondary)" }}>
                <span>📅 Season:</span>
                <strong style={{ color: "var(--text-primary)" }}>{activeDestination.bestSeason.split(" ")[0]}</strong>
              </div>
              <div style={{ display: "flex", gap: "6px", color: "var(--text-secondary)" }}>
                <span>💵 Entry:</span>
                <strong style={{ color: "var(--text-primary)" }}>{activeDestination.entryFee}</strong>
              </div>
            </div>
            
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${activeDestination.coordinates.lat},${activeDestination.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "10px", fontSize: "0.8rem", justifyContent: "center", textDecoration: "none", width: "100%" }}
            >
              <ExternalLink size={14} />
              Open in Google Maps
            </a>
          </div>
        )}
      </div>

      <style>{`
        .custom-map-marker {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
