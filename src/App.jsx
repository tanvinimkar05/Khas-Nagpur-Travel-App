import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import AIPlanner from "./components/AIPlanner";
import MapContainer from "./components/MapContainer";
import FoodShowcase from "./components/FoodShowcase";
import SignInModal from "./components/SignInModal";
import VoiceAssistant from "./components/VoiceAssistant";

export default function App() {
  const [activeTab, setActiveTab] = useState("explore");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  // Load user session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("active_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("active_user");
    setCurrentUser(null);
  };

  const handleSelectPlaceOnMap = (placeId) => {
    setSelectedPlaceId(placeId);
  };

  const handleResetSelectedPlace = () => {
    setSelectedPlaceId(null);
  };

  // Render correct tab view
  const renderTabContent = () => {
    switch (activeTab) {
      case "explore":
        return (
          <Explore
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectPlaceOnMap={handleSelectPlaceOnMap}
          />
        );
      case "planner":
        return (
          <AIPlanner
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectPlaceOnMap={handleSelectPlaceOnMap}
          />
        );
      case "map":
        return (
          <MapContainer
            selectedPlaceId={selectedPlaceId}
            onResetSelectedPlace={handleResetSelectedPlace}
          />
        );
      case "food":
        return <FoodShowcase />;
      default:
        return (
          <Explore
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectPlaceOnMap={handleSelectPlaceOnMap}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Tab Render Space */}
      <main className="main-content">{renderTabContent()}</main>

      {/* Floating Interactive Voice Assistant */}
      <VoiceAssistant
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPlaceOnMap={handleSelectPlaceOnMap}
      />

      {/* Authentication Modal */}
      <SignInModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLogin}
      />
    </div>
  );
}
