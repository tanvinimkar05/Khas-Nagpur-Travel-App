import React, { useState } from "react";
import { Utensils, Flame, MapPin, Info, Heart, Award } from "lucide-react";
import { FOOD_DATA } from "../data/places";

export default function FoodShowcase() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (foodId, e) => {
    e.stopPropagation();
    const newFavs = { ...favorites, [foodId]: !favorites[foodId] };
    setFavorites(newFavs);
    localStorage.setItem("food_favorites", JSON.stringify(newFavs));
  };

  React.useEffect(() => {
    const savedFavs = localStorage.getItem("food_favorites");
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  // Spice level mapping for Nagpur's famous foods
  const spiceLevels = {
    "saoji_curry": { score: 10, label: "Legendary Flame (Extremely Spicy)", color: "#ef4444" },
    "patodi_rassa": { score: 9, label: "Fiery Heat", color: "#f97316" },
    "tarri_poha": { score: 7, label: "Spicy Zing", color: "#f59e0b" },
    "gila_wada": { score: 4, label: "Mild & Cool Zest", color: "#3b82f6" },
    "santra_barfi": { score: 0, label: "Sweet Citrus (Non-Spicy)", color: "#10b981" }
  };

  const getSpiceFlameArray = (score) => {
    return Array.from({ length: 5 }, (_, i) => {
      // Calculate flame active state
      const threshold = (i + 1) * 2;
      return score >= threshold;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
      {/* Banner */}
      <div className="glass-panel" style={{
        padding: "48px 32px",
        background: "linear-gradient(rgba(10, 14, 20, 0.8), rgba(10, 14, 20, 0.95)), radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 60%)",
        border: "1px solid rgba(239, 68, 68, 0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "12px"
      }}>
        <span className="badge" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.3)", fontSize: "0.8rem", letterSpacing: "2px" }}>CULINARY SPECIALTIES</span>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", fontFamily: "var(--font-headings)" }}>
          Taste the Fiery <span style={{ color: "#ef4444" }}>Saoji</span> Flavors
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", fontSize: "1.05rem" }}>
          Nagpur's cuisine is famous for its unique spice-blend of 32 ingredients. Challenge your tastebuds with authentic local curries, savory breakfasts, and zesty orange desserts.
        </p>
      </div>

      {/* Food Grid */}
      <div className="responsive-grid">
        {FOOD_DATA.map((food) => {
          const spice = spiceLevels[food.id] || { score: 0, label: "Unknown", color: "#6b7280" };
          const isFav = !!favorites[food.id];
          return (
            <div
              key={food.id}
              className="glass-panel glass-panel-hover"
              onClick={() => setSelectedFood(food)}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative"
              }}
            >
              {/* Top Banner Accent */}
              <div style={{
                height: "8px",
                background: `linear-gradient(90deg, ${spice.color}, #ff7b00)`
              }} />

              {/* Card Body */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1, gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>{food.name}</h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Nagpur Classic
                    </p>
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(food.id, e)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isFav ? "#ef4444" : "var(--text-secondary)",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--glass-border)"}
                  >
                    <Heart size={16} fill={isFav ? "#ef4444" : "none"} />
                  </button>
                </div>

                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5", flex: 1 }}>
                  {food.description}
                </p>

                {/* Spice Meter */}
                <div style={{
                  background: "rgba(0,0,0,0.15)",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: "500" }}>Spice Level:</span>
                    <span style={{ fontSize: "0.8rem", color: spice.color, fontWeight: "600" }}>{spice.score}/10</span>
                  </div>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    {getSpiceFlameArray(spice.score).map((active, i) => (
                      <Flame
                        key={i}
                        size={16}
                        fill={active ? spice.color : "none"}
                        color={active ? spice.color : "rgba(255,255,255,0.15)"}
                      />
                    ))}
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "4px" }}>
                      {spice.label}
                    </span>
                  </div>
                </div>

                {/* Famous Spots */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={12} color="var(--color-accent)" />
                    Best Places to Eat in Nagpur:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {food.bestSpots.map((spot, i) => (
                      <span
                        key={i}
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid var(--glass-border)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "var(--text-primary)"
                        }}
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learn More Action */}
                <button
                  className="btn-secondary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "8px",
                    fontSize: "0.82rem",
                    gap: "6px",
                    marginTop: "4px"
                  }}
                >
                  <Info size={14} />
                  See Recipe & Heritage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Food Heritage Drawer / Modal */}
      {selectedFood && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(10, 14, 20, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div className="glass-panel" style={{
            width: "100%",
            maxWidth: "500px",
            padding: "32px",
            border: "1px solid rgba(255, 111, 0, 0.2)",
            position: "relative",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <button
              onClick={() => setSelectedFood(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "color var(--transition-fast)"
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                background: "rgba(255, 111, 0, 0.15)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-accent)"
              }}>
                <Utensils size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "700" }}>{selectedFood.name}</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Heritage Recipe & Details</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "20px 0" }}>
              <div>
                <h4 style={{ fontSize: "0.9rem", color: "var(--color-accent-hover)", fontWeight: "600", marginBottom: "4px" }}>
                  CULINARY PROFILE
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {selectedFood.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.9rem", color: "var(--color-accent-hover)", fontWeight: "600", marginBottom: "4px" }}>
                  FAMOUS FOR
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  🌟 {selectedFood.famousFor}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.9rem", color: "var(--color-accent-hover)", fontWeight: "600", marginBottom: "6px" }}>
                  TRADITIONAL SPICE BLEND
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", fontStyle: "italic", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "6px", border: "1px dashed rgba(255,255,255,0.08)" }}>
                  Made using dry roasted spices including black pepper, cardamom, clove, nutmeg, bay leaves, poppy seeds, stone flower (kalpasi), and local red chilies.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedFood(null)}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Great, I want to try this!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
