import React from "react";
import { Compass, Map, Utensils, Calendar, User, LogOut, Clock, HelpCircle } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, currentUser, onOpenAuth, onLogout }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  };

  const menuItems = [
    { id: "explore", label: "Explore Gems", icon: Compass },
    { id: "planner", label: "AI Trip Planner", icon: Calendar },
    { id: "map", label: "Interactive Map", icon: Map },
    { id: "food", label: "Saoji & Food", icon: Utensils }
  ];

  return (
    <header className="glass-panel" style={{
      margin: "12px 12px 0 12px",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 100,
      position: "relative"
    }}>
      {/* Brand Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => setActiveTab("explore")}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-accent), #ffd600)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(255, 111, 0, 0.4)",
          cursor: "pointer"
        }}>
          <Compass size={22} color="white" />
        </div>
        <div style={{ cursor: "pointer" }}>
          <h1 style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--text-primary)" }}>
            KHAS <span style={{ color: "var(--color-accent)" }}>NAGPUR</span>
          </h1>
          <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Hidden Gems of Central India
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: "flex", gap: "8px" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: isActive ? "rgba(255, 111, 0, 0.12)" : "transparent",
                border: "1px solid",
                borderColor: isActive ? "rgba(255, 111, 0, 0.3)" : "transparent",
                color: isActive ? "var(--color-accent-hover)" : "var(--text-secondary)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: isActive ? "600" : "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all var(--transition-fast)"
              }}
              className={isActive ? "" : "btn-nav-hover"}
            >
              <Icon size={18} />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Time & Profile Area */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Local Clock */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.03)",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.05)",
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
          fontWeight: "500"
        }}>
          <Clock size={14} color="var(--color-accent)" />
          <span>{formatTime(time)}</span>
        </div>

        {/* User Account Action */}
        {currentUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-primary)" }}>
                {currentUser.name}
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--color-success)", fontWeight: "500" }}>
                🏆 {currentUser.badge || "Explorer"}
              </p>
            </div>
            <div style={{ position: "relative", display: "flex", gap: "8px" }}>
              <button
                onClick={onLogout}
                title="Logout"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#ef4444",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)"
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: "0.9rem" }}
          >
            <User size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>

      <style>{`
        .btn-nav-hover:hover {
          color: var(--text-primary) !important;
          background: rgba(255, 255, 255, 0.03);
        }
        @media (max-width: 900px) {
          .nav-label {
            display: none;
          }
        }
        @media (max-width: 600px) {
          header {
            flex-direction: column;
            gap: 12px;
            padding: 12px !important;
            margin: 6px 6px 0 6px !important;
          }
          header > div {
            width: 100%;
            justify-content: space-between;
          }
          nav {
            width: 100%;
            justify-content: space-around;
          }
        }
      `}</style>
    </header>
  );
}
