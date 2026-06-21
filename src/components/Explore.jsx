import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Clock, DollarSign, CheckSquare, Square, Info, Compass, ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import { PLACES_DATA } from "../data/places";

export default function Explore({ activeTab, setActiveTab, onSelectPlaceOnMap }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxDistance, setMaxDistance] = useState(100);
  const [filteredPlaces, setFilteredPlaces] = useState(PLACES_DATA);
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  // Image slider state in detail modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Packing list state from LocalStorage
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const savedChecks = localStorage.getItem("travel_packing_checks");
    if (savedChecks) {
      setCheckedItems(JSON.parse(savedChecks));
    }
  }, []);

  const toggleCheckItem = (placeId, itemIndex) => {
    const key = `${placeId}_${itemIndex}`;
    const newChecked = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newChecked);
    localStorage.setItem("travel_packing_checks", JSON.stringify(newChecked));
  };

  useEffect(() => {
    const filtered = PLACES_DATA.filter((place) => {
      const matchesSearch = 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.famousFood.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
      const matchesDistance = place.distanceFromCenter <= maxDistance;

      return matchesSearch && matchesCategory && matchesDistance;
    });
    setFilteredPlaces(filtered);
  }, [searchQuery, selectedCategory, maxDistance]);

  const categories = ["All", "Wildlife", "Spiritual & Heritage", "Nature & Adventure", "Nature & Leisure"];

  const openPlaceDetails = (place) => {
    setSelectedPlace(place);
    setCurrentImageIndex(0);
  };

  const closePlaceDetails = () => {
    setSelectedPlace(null);
  };

  // Get matching image or fallback gradient card
  const getPlaceImage = (place, index) => {
    // Top 4 generated images exist, others can fall back
    const generatedImages = {
      "pench": "/images/pench_safari.jpg",
      "ramtek": "/images/ramtek_temple.jpg",
      "khekranala": "/images/khekranala_lake.jpg",
      "deekshabhoomi": "/images/deekshabhoomi_front.jpg"
    };

    if (generatedImages[place.id] && index === 0) {
      return generatedImages[place.id];
    }
    
    // Return standard gradients if no images are loaded, which look extremely sleek!
    return null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
      {/* Hero Banner Section */}
      <div className="glass-panel" style={{
        padding: "48px 32px",
        background: "linear-gradient(rgba(10, 14, 20, 0.7), rgba(10, 14, 20, 0.95)), url('/images/pench_safari.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid rgba(255, 111, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "12px"
      }}>
        <span className="badge badge-orange" style={{ fontSize: "0.8rem", letterSpacing: "2px" }}>NAGPUR TRAVEL PORTAL</span>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", fontFamily: "var(--font-headings)", textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
          Uncover the <span style={{ color: "var(--color-accent)" }}>Hidden Gems</span> of Vidarbha
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", fontSize: "1.05rem" }}>
          From the jungle sanctuaries that inspired Kipling's Jungle Book to ancient monolithic temples on volcanic ridges, explore Nagpur's best kept secrets.
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="glass-panel" style={{
        padding: "20px 24px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Search Input */}
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <span style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }}>
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by spot name, food, activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input"
            style={{ width: "100%", paddingLeft: "38px" }}
          />
        </div>

        {/* Distance Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "220px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
            Max Distance: <strong>{maxDistance} km</strong>
          </span>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={maxDistance}
            onChange={(e) => setMaxDistance(parseInt(e.target.value))}
            style={{
              flex: 1,
              accentColor: "var(--color-accent)",
              cursor: "pointer"
            }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? "var(--color-accent)" : "rgba(255, 255, 255, 0.03)",
              color: selectedCategory === cat ? "white" : "var(--text-secondary)",
              border: "1px solid",
              borderColor: selectedCategory === cat ? "var(--color-accent)" : "var(--glass-border)",
              borderRadius: "20px",
              padding: "8px 18px",
              fontSize: "0.85rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all var(--transition-fast)"
            }}
            className="btn-category-hover"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="responsive-grid">
          {filteredPlaces.map((place) => {
            const signatureImg = getPlaceImage(place, 0);
            return (
              <div
                key={place.id}
                className="glass-panel glass-panel-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "hidden"
                }}
              >
                {/* Place Image / Card Top */}
                <div style={{
                  height: "200px",
                  position: "relative",
                  background: signatureImg 
                    ? `url('${signatureImg}') center/cover no-repeat` 
                    : `linear-gradient(135deg, var(--bg-tertiary), rgba(255,111,0,0.15))`,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "16px"
                }}>
                  {/* Category Badge */}
                  <span
                    className={`badge ${
                      place.category.includes("Wildlife") 
                        ? "badge-wildlife" 
                        : place.category.includes("Spiritual") 
                        ? "badge-spiritual" 
                        : "badge-nature"
                    }`}
                    style={{ position: "absolute", top: "12px", left: "12px" }}
                  >
                    {place.category}
                  </span>

                  {/* Gradient shadow for text readability */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(transparent, rgba(10, 14, 20, 0.9))",
                    pointerEvents: "none"
                  }} />

                  {/* Distance Overlay */}
                  <div style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    background: "rgba(0,0,0,0.6)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    zIndex: 1
                  }}>
                    <MapPin size={12} color="var(--color-accent)" />
                    {place.distanceFromCenter} km away
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>{place.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", flex: 1 }}>
                    {place.shortDescription}
                  </p>
                  
                  {/* Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "10px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <Calendar size={12} color="var(--color-accent)" />
                      <span>Best Season: <strong style={{ color: "var(--text-primary)" }}>{place.bestSeason.split(" ")[0]}</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <Utensils size={12} color="var(--color-accent)" />
                      <span style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>Food: <strong style={{ color: "var(--text-primary)" }}>{place.famousFood.split(",")[0]}</strong></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button
                      onClick={() => openPlaceDetails(place)}
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: "center", padding: "8px 12px", fontSize: "0.85rem" }}
                    >
                      <Info size={14} />
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        onSelectPlaceOnMap(place.id);
                        setActiveTab("map");
                      }}
                      className="btn-secondary"
                      title="Show on map"
                      style={{ padding: "8px 12px" }}
                    >
                      <MapPin size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "48px",
          color: "var(--text-secondary)"
        }} className="glass-panel">
          <p style={{ fontSize: "1.1rem" }}>No hidden gems found matching your filter criteria.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setMaxDistance(100); }}
            className="btn-primary"
            style={{ marginTop: "16px" }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Place Details Modal (Drawer) */}
      {selectedPlace && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 14, 20, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "flex-end",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          {/* Modal Sidebar Panel */}
          <div className="glass-panel" style={{
            width: "100%",
            maxWidth: "600px",
            height: "100%",
            borderRadius: "0",
            borderLeft: "1px solid rgba(255, 111, 0, 0.25)",
            padding: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            {/* Modal Header */}
            <div style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 10,
              display: "flex",
              gap: "8px"
            }}>
              <button
                onClick={closePlaceDetails}
                style={{
                  background: "rgba(10, 14, 20, 0.75)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                <XClose size={20} />
              </button>
            </div>

            {/* Slider / Image Gallery */}
            <div style={{
              height: "320px",
              width: "100%",
              position: "relative",
              background: getPlaceImage(selectedPlace, 0)
                ? `url('${getPlaceImage(selectedPlace, 0)}') center/cover no-repeat`
                : `linear-gradient(135deg, var(--bg-tertiary), rgba(255,111,0,0.25))`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "32px 24px"
            }}>
              {/* Fade Overlay */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, rgba(10, 14, 20, 0.2), rgba(10, 14, 20, 0.95))"
              }} />

              {/* Title & Coordinates Overlay */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="badge badge-orange" style={{ marginBottom: "8px" }}>{selectedPlace.category}</span>
                <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>{selectedPlace.name}</h2>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={14} color="var(--color-accent)" />
                    {selectedPlace.distanceFromCenter} km from Nagpur center
                  </span>
                  <span>•</span>
                  <span>GPS: {selectedPlace.coordinates.lat.toFixed(4)}° N, {selectedPlace.coordinates.lng.toFixed(4)}° E</span>
                </div>
              </div>
            </div>

            {/* Modal Body Info */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Description */}
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-accent-hover)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Overview
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
                  {selectedPlace.longDescription}
                </p>
              </div>

              {/* Practical Travel Info */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                background: "rgba(255,255,255,0.02)",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--glass-border)"
              }}>
                <div>
                  <h5 style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <Calendar size={14} color="var(--color-accent)" />
                    Best Season
                  </h5>
                  <p style={{ fontSize: "0.9rem", fontWeight: "600" }}>{selectedPlace.bestSeason}</p>
                </div>
                <div>
                  <h5 style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <Clock size={14} color="var(--color-accent)" />
                    Timings
                  </h5>
                  <p style={{ fontSize: "0.9rem", fontWeight: "600" }}>{selectedPlace.timing}</p>
                </div>
                <div>
                  <h5 style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <DollarSign size={14} color="var(--color-accent)" />
                    Entry Fees
                  </h5>
                  <p style={{ fontSize: "0.9rem", fontWeight: "600" }}>{selectedPlace.entryFee}</p>
                </div>
                <div>
                  <h5 style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <Utensils size={14} color="var(--color-accent)" />
                    Local Famous Food
                  </h5>
                  <p style={{ fontSize: "0.9rem", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {selectedPlace.famousFood.split(",")[0]}
                  </p>
                </div>
              </div>

              {/* Key Attractions */}
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-accent-hover)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Key Attractions
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyleType: "none" }}>
                  {selectedPlace.attractions.map((att, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.95rem" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Food Specialties Section */}
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-accent-hover)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Famous Local Food Nearby
                </h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.5", background: "rgba(255, 111, 0, 0.05)", borderLeft: "3px solid var(--color-accent)", padding: "12px", borderRadius: "0 8px 8px 0" }}>
                  🍽️ {selectedPlace.famousFood}
                </p>
              </div>

              {/* Interesting Facts */}
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-accent-hover)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Did You Know?
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedPlace.facts.map((fact, i) => (
                    <p key={i} style={{ fontSize: "0.88rem", fontStyle: "italic", color: "var(--text-secondary)", background: "rgba(255,255,255,0.01)", padding: "8px 12px", borderRadius: "6px", borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                      "{fact}"
                    </p>
                  ))}
                </div>
              </div>

              {/* Interactive Packing Checklist */}
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-accent-hover)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  🎒 Travel Packing Checklist
                </h4>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  background: "rgba(0,0,0,0.2)",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid var(--glass-border)"
                }}>
                  {selectedPlace.packingChecklist.map((item, index) => {
                    const checkKey = `${selectedPlace.id}_${index}`;
                    const isChecked = !!checkedItems[checkKey];
                    return (
                      <div
                        key={index}
                        onClick={() => toggleCheckItem(selectedPlace.id, index)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          color: isChecked ? "var(--text-muted)" : "var(--text-primary)",
                          textDecoration: isChecked ? "line-through" : "none",
                          transition: "all var(--transition-fast)"
                        }}
                      >
                        {isChecked ? (
                          <CheckSquare size={18} color="var(--color-success)" />
                        ) : (
                          <Square size={18} color="var(--text-secondary)" />
                        )}
                        <span style={{ fontSize: "0.9rem" }}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Action Button */}
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button
                  onClick={() => {
                    onSelectPlaceOnMap(selectedPlace.id);
                    setActiveTab("map");
                    closePlaceDetails();
                  }}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Compass size={18} />
                  Locate & Draw Route on Map
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.coordinates.lat},${selectedPlace.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  Google Maps Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .btn-category-hover:hover {
          background: rgba(255, 111, 0, 0.15) !important;
          color: var(--color-accent-hover) !important;
          border-color: rgba(255, 111, 0, 0.3) !important;
        }
      `}</style>
    </div>
  );
}

// Rename standard Lucide Close icon because 'X' conflicts with close button var.
function XClose({ size = 24, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
