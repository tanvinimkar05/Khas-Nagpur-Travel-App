import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Wallet, Check, Download, MapPin, ChevronRight, Utensils, Shield, ShieldCheck, RefreshCw } from "lucide-react";
import { PLACES_DATA } from "../data/places";

export default function AIPlanner({ activeTab, setActiveTab, onSelectPlaceOnMap }) {
  const [prompt, setPrompt] = useState("");
  const [days, setDays] = useState(3);
  
  // Budget Category States
  const [budgetTier, setBudgetTier] = useState("Comfort"); // Economy, Comfort, Luxury
  const [staySlider, setStaySlider] = useState(50); // 0-100 (Economy to Luxury)
  const [foodSlider, setFoodSlider] = useState(50);
  const [travelSlider, setTravelSlider] = useState(50);
  const [activitySlider, setActivitySlider] = useState(50);

  const [itinerary, setItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to determine tier from slider value
  const getTierFromSlider = (value) => {
    if (value < 33) return "Economy";
    if (value < 75) return "Comfort";
    return "Luxury";
  };

  // Helper to calculate cost estimates based on sliders and days
  const calculateTotalCost = () => {
    const stayCostPerDay = staySlider < 33 ? 800 : staySlider < 75 ? 2200 : 6500;
    const foodCostPerDay = foodSlider < 33 ? 350 : foodSlider < 75 ? 850 : 2000;
    const travelCostPerDay = travelSlider < 33 ? 250 : travelSlider < 75 ? 1200 : 3500;
    const activityCostPerDay = activitySlider < 33 ? 150 : activitySlider < 75 ? 600 : 2500;

    const totalPerDay = stayCostPerDay + foodCostPerDay + travelCostPerDay + activityCostPerDay;
    return totalPerDay * days;
  };

  // Pre-made prompts for quick user selection
  const quickPrompts = [
    { label: "🐅 Wildlife & Nature Weekend", text: "Plan a 2-day nature adventure focused on wildlife safaris and forest camping." },
    { label: "🛕 Spiritual Pilgrimage Tour", text: "Create a 3-day quiet tour visiting ancient Ganesha temples and hilltop spiritual spots." },
    { label: "🌶️ Local Foodie & Sightseeing", text: "1-day sightseeing trip inside the city highlighting local food places like Saoji and Poha." }
  ];

  // Generate local heuristic-based AI Itinerary
  const generateItinerary = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setItinerary(null);

    // Simulate AI loading/thinking
    setTimeout(() => {
      const lowerPrompt = prompt.toLowerCase();
      
      // Heuristic parsing for category preferences
      let theme = "Balanced Explorer";
      let selectedSpots = [];

      if (lowerPrompt.includes("wildlife") || lowerPrompt.includes("safari") || lowerPrompt.includes("tiger") || lowerPrompt.includes("animal")) {
        theme = "Jungle Wildlife Safari";
        // Prioritize Pench and Umred
        selectedSpots = ["pench", "umred", "khekranala", "waki", "zilpi", "futala"];
      } else if (lowerPrompt.includes("spiritual") || lowerPrompt.includes("temple") || lowerPrompt.includes("religious") || lowerPrompt.includes("god")) {
        theme = "Sacred Heritage Pilgrimage";
        // Prioritize Ramtek, Deekshabhoomi, Adasa, Koradi
        selectedSpots = ["ramtek", "deekshabhoomi", "koradi", "adasa", "futala", "zilpi"];
      } else if (lowerPrompt.includes("nature") || lowerPrompt.includes("lake") || lowerPrompt.includes("water") || lowerPrompt.includes("monsoon") || lowerPrompt.includes("forest")) {
        theme = "Lakeside Nature & Landscapes";
        selectedSpots = ["khekranala", "zilpi", "waki", "pench", "ramtek", "futala"];
      } else if (lowerPrompt.includes("food") || lowerPrompt.includes("eat") || lowerPrompt.includes("saoji") || lowerPrompt.includes("poha") || lowerPrompt.includes("dish")) {
        theme = "Saoji Food Trail & Leisure";
        selectedSpots = ["futala", "deekshabhoomi", "waki", "koradi", "ramtek", "zilpi"];
      } else {
        // Balanced mix of spots
        selectedSpots = ["pench", "ramtek", "deekshabhoomi", "khekranala", "futala", "koradi", "zilpi", "adasa", "waki", "umred"];
      }

      // Filter and arrange unique spots for the length of the trip (up to duration 'days')
      const placesToVisit = PLACES_DATA.filter(p => selectedSpots.includes(p.id));
      
      // Ensure we have enough places, padding with overall data if needed
      while (placesToVisit.length < days) {
        const unusedPlace = PLACES_DATA.find(p => !placesToVisit.some(pv => pv.id === p.id));
        if (unusedPlace) {
          placesToVisit.push(unusedPlace);
        } else {
          break;
        }
      }

      const generatedDays = [];
      const stayTier = getTierFromSlider(staySlider);
      const foodTier = getTierFromSlider(foodSlider);
      const travelTier = getTierFromSlider(travelSlider);
      const activityTier = getTierFromSlider(activitySlider);

      // Descriptions depending on Budget Tiers
      const stayDescriptions = {
        Economy: "Backpacker Hostel dormitory / pitching a basic riverside camping tent",
        Comfort: "3-star business hotel / AC MTDC Tourist Guest House overlooking the lake",
        Luxury: "Heritage pool villa at Wildlife Sanctuary Resort / Premium boutique hotel suite"
      };

      const travelDescriptions = {
        Economy: "renting a local geared scooter / taking state transport buses or shared auto",
        Comfort: "pre-booked private air-conditioned hatchback taxi (e.g. Swift Dzire)",
        Luxury: "private chauffeured luxury SUV (e.g. Toyota Innova Crysta / Safari 4x4 Jeep)"
      };

      const foodDescriptions = {
        Economy: "street-side dhabas, local tapris for hot Tarri Poha, and budget meals",
        Comfort: "family restaurants, seeking local culinary centers (e.g. Haldiram's, Saoji joints)",
        Luxury: "multi-cuisine fine dining restaurants and boutique estate cafeterias"
      };

      // Construct day-by-day timeline
      for (let d = 1; d <= days; d++) {
        const primaryPlace = placesToVisit[(d - 1) % placesToVisit.length];
        const secondaryPlace = placesToVisit[d % placesToVisit.length];

        let morningActivity = `Start early morning from Nagpur. Travel via ${travelDescriptions[travelTier]}. Breakfast of hot local Poha.`;
        let afternoonActivity = `Arrive at **${primaryPlace.name}**. Explore the main highlights: ${primaryPlace.attractions[0]} and ${primaryPlace.attractions[1]}.`;
        let eveningActivity = `Lakeside walk and sunset photos near **${secondaryPlace.name}**. Enjoy snacks nearby like hot roasted corn on the cob.`;
        let nightActivity = `Check-in for your night stay: ${stayDescriptions[stayTier]}. Dine on traditional dishes matching ${foodDescriptions[foodTier]}.`;

        // Customize specific spots for authenticity
        if (primaryPlace.id === "pench") {
          morningActivity = `Depart at 5:00 AM in your ${travelDescriptions[travelTier]} to Pench. Check in and have breakfast.`;
          afternoonActivity = `Embark on the **Pench Wildlife Safari** (Jeep ride). Spot tigers, leopards, and bison.`;
          eveningActivity = `Explore the Kohka Lake sunset point and browse the local tribal craft shops.`;
        } else if (primaryPlace.id === "ramtek") {
          morningActivity = `Travel to Ramtek hill. Enjoy hot Ramtek Samosas served with kadhi for breakfast.`;
          afternoonActivity = `Climb the Garh Temple fort steps. Read the stone scriptures and visit the Kalidasa Memorial.`;
          eveningActivity = `Head down to Khindsi Lake for speed-boating and relaxing in lakeside cafes.`;
        } else if (primaryPlace.id === "deekshabhoomi") {
          morningActivity = `City tour start. Visit Deekshabhoomi Stupa dome. Sit in silence under the Bodhi tree.`;
          afternoonActivity = `Browse historical archives in the Ambedkar Museum. Enjoy lunch at a nearby authentic Saoji Bhojnalaya.`;
          eveningActivity = `Evening leisure walk at Futala Lake waterfront. Watch the musical laser fountain lights.`;
        }

        generatedDays.push({
          day: d,
          destination: primaryPlace,
          activities: {
            morning: morningActivity,
            afternoon: afternoonActivity,
            evening: eveningActivity,
            night: nightActivity
          }
        });
      }

      setItinerary({
        theme,
        totalCost: calculateTotalCost(),
        stayTier,
        foodTier,
        travelTier,
        activityTier,
        daysList: generatedDays
      });
      setIsGenerating(false);
    }, 1500);
  };

  // Export current trip plan as a local text file
  const exportItinerary = () => {
    if (!itinerary) return;

    let text = `==================================================\n`;
    text += `   KHAS NAGPUR - AI PLANNED TRAVEL ITINERARY      \n`;
    text += `==================================================\n`;
    text += `Theme: ${itinerary.theme}\n`;
    text += `Duration: ${days} Days\n`;
    text += `Total Estimated Budget: ₹${itinerary.totalCost.toLocaleString("en-IN")}\n`;
    text += `--------------------------------------------------\n`;
    text += `Budget Preferences:\n`;
    text += `- Accommodation: ${itinerary.stayTier}\n`;
    text += `- Dining/Food: ${itinerary.foodTier}\n`;
    text += `- Transport: ${itinerary.travelTier}\n`;
    text += `- Activities: ${itinerary.activityTier}\n`;
    text += `==================================================\n\n`;

    itinerary.daysList.forEach((d) => {
      text += `DAY ${d.day} : EXPLORING ${d.destination.name.toUpperCase()}\n`;
      text += `--------------------------------------------------\n`;
      text += `🌅 MORNING   : ${d.activities.morning.replace(/\*\*/g, "")}\n`;
      text += `☀️ AFTERNOON : ${d.activities.afternoon.replace(/\*\*/g, "")}\n`;
      text += `🌇 EVENING   : ${d.activities.evening.replace(/\*\*/g, "")}\n`;
      text += `🌙 NIGHT     : ${d.activities.night.replace(/\*\*/g, "")}\n\n`;
    });

    text += `Travel Safety Tip: Carry cash as network in remote jungle gateways (like Pench/Khekranala) can be spotty. Enjoy your journey!\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nagpur_trip_planner_${days}_days.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "24px", alignItems: "start" }} className="animate-fade-in">
      {/* Input controls Panel */}
      <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={20} color="var(--color-accent)" />
            AI Travel Generator
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            Provide trip expectations in the prompt, or select quick templates below.
          </p>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={generateItinerary} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>
              Trip Requirements / Prompt
            </label>
            <textarea
              placeholder="e.g. 3-day family trip focused on wildlife safaris, tiger spotting, with local Saoji dinner recommendation and comfortable transport..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="glass-input"
              rows={4}
              style={{ resize: "none", width: "100%", fontSize: "0.88rem", lineHeight: "1.4" }}
            />
          </div>

          {/* Quick Prompts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>Quick Templates:</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setPrompt(qp.text); }}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "0.78rem",
                    textAlign: "left",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Days Selection Slider */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                Trip Duration (Days)
              </label>
              <strong style={{ fontSize: "0.9rem", color: "var(--color-accent-hover)" }}>{days} Days</strong>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              style={{ accentColor: "var(--color-accent)", cursor: "pointer" }}
            />
          </div>

          <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          {/* Budget Adjustment Category Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Adjust Budget Sliders
            </span>

            {/* Slider 1: Stay */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Accommodations:</span>
                <span style={{ fontWeight: "600", color: staySlider < 33 ? "#34d399" : staySlider < 75 ? "#fbbf24" : "#f87171" }}>
                  {getTierFromSlider(staySlider)}
                </span>
              </div>
              <input
                type="range"
                value={staySlider}
                onChange={(e) => setStaySlider(parseInt(e.target.value))}
                style={{ accentColor: "var(--color-accent)", cursor: "pointer", height: "4px" }}
              />
            </div>

            {/* Slider 2: Transport */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Transportation:</span>
                <span style={{ fontWeight: "600", color: travelSlider < 33 ? "#34d399" : travelSlider < 75 ? "#fbbf24" : "#f87171" }}>
                  {getTierFromSlider(travelSlider)}
                </span>
              </div>
              <input
                type="range"
                value={travelSlider}
                onChange={(e) => setTravelSlider(parseInt(e.target.value))}
                style={{ accentColor: "var(--color-accent)", cursor: "pointer", height: "4px" }}
              />
            </div>

            {/* Slider 3: Food */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Dining & Food:</span>
                <span style={{ fontWeight: "600", color: foodSlider < 33 ? "#34d399" : foodSlider < 75 ? "#fbbf24" : "#f87171" }}>
                  {getTierFromSlider(foodSlider)}
                </span>
              </div>
              <input
                type="range"
                value={foodSlider}
                onChange={(e) => setFoodSlider(parseInt(e.target.value))}
                style={{ accentColor: "var(--color-accent)", cursor: "pointer", height: "4px" }}
              />
            </div>

            {/* Slider 4: Activities */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Guides & Safari Entry:</span>
                <span style={{ fontWeight: "600", color: activitySlider < 33 ? "#34d399" : activitySlider < 75 ? "#fbbf24" : "#f87171" }}>
                  {getTierFromSlider(activitySlider)}
                </span>
              </div>
              <input
                type="range"
                value={activitySlider}
                onChange={(e) => setActivitySlider(parseInt(e.target.value))}
                style={{ accentColor: "var(--color-accent)", cursor: "pointer", height: "4px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isGenerating}
            style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: "12px" }}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" size={16} />
                Processing Prompt...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Custom AI Itinerary
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output details Panel */}
      <div style={{ height: "100%" }}>
        {itinerary ? (
          <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px", border: "1px solid rgba(255,111,0,0.25)" }}>
            {/* Header Summary */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span className="badge badge-orange" style={{ marginBottom: "6px" }}>
                  🌿 AI PLANNED : {itinerary.theme}
                </span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "800" }}>{days} Days in Nagpur</h3>
              </div>
              
              {/* Cost Box */}
              <div style={{
                background: "rgba(255, 111, 0, 0.1)",
                border: "1px solid rgba(255, 111, 0, 0.25)",
                padding: "8px 16px",
                borderRadius: "8px",
                textAlign: "right"
              }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block" }}>ESTIMATED TOTAL</span>
                <strong style={{ fontSize: "1.3rem", color: "var(--text-highlight)", fontFamily: "var(--font-headings)" }}>
                  ₹{itinerary.totalCost.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* Budget verification badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "6px",
              padding: "8px 12px",
              fontSize: "0.8rem",
              color: "#34d399"
            }}>
              <ShieldCheck size={16} style={{ flexShrink: 0 }} />
              <span>Budget is optimized! Lodging: <strong>{itinerary.stayTier}</strong>, Ride: <strong>{itinerary.travelTier}</strong>, Dining: <strong>{itinerary.foodTier}</strong>.</span>
            </div>

            {/* Day by Day Itinerary timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {itinerary.daysList.map((dayItem) => (
                <div key={dayItem.day} style={{
                  display: "flex",
                  gap: "16px",
                  borderLeft: "2px solid rgba(255, 111, 0, 0.2)",
                  paddingLeft: "18px",
                  position: "relative"
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    position: "absolute",
                    left: "-7px",
                    top: "4px",
                    boxShadow: "0 0 8px var(--color-accent)"
                  }} />

                  {/* Day Content */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: "700" }}>Day {dayItem.day}: {dayItem.destination.name}</h4>
                      <button
                        onClick={() => {
                          onSelectPlaceOnMap(dayItem.destination.id);
                          setActiveTab("map");
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--color-accent-hover)",
                          fontSize: "0.78rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        <MapPin size={12} />
                        Locate
                      </button>
                    </div>

                    {/* Timeline Slots */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "8px",
                      fontSize: "0.85rem",
                      background: "rgba(255,255,255,0.01)",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid var(--glass-border)"
                    }}>
                      <div>🌅 <strong style={{ color: "var(--text-primary)" }}>Morning:</strong> {dayItem.activities.morning}</div>
                      <div>☀️ <strong style={{ color: "var(--text-primary)" }}>Afternoon:</strong> {dayItem.activities.afternoon}</div>
                      <div>🌇 <strong style={{ color: "var(--text-primary)" }}>Evening:</strong> {dayItem.activities.evening}</div>
                      <div>🌙 <strong style={{ color: "var(--text-primary)" }}>Night:</strong> {dayItem.activities.night}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Export action */}
            <button
              onClick={exportItinerary}
              className="btn-primary"
              style={{
                marginTop: "12px",
                justifyContent: "center",
                width: "100%",
                padding: "12px"
              }}
            >
              <Download size={16} />
              Export & Download Text Itinerary
            </button>
          </div>
        ) : (
          <div className="glass-panel" style={{
            height: "100%",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "48px",
            color: "var(--text-secondary)",
            border: "1px dashed var(--glass-border)"
          }}>
            <Sparkles size={48} style={{ color: "rgba(255,111,0,0.2)", marginBottom: "16px" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)" }}>No Itinerary Planned Yet</h3>
            <p style={{ fontSize: "0.85rem", maxWidth: "340px", marginTop: "6px" }}>
              Configure your preferences or write a prompt on the left, then click generate to compile a personalized day-by-day travel map.
            </p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 900px) {
          grid-template-columns: 1fr !important;
        }
      `}</style>
    </div>
  );
}
