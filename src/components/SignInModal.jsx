import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldAlert, Award, Calendar, Landmark } from "lucide-react";
import confetti from "canvas-confetti";

export default function SignInModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6f00", "#ffd600", "#3b82f6", "#10b981"]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (isSignUp) {
      // Register
      const newUser = {
        name,
        email,
        badge: "Novice Explorer",
        savedTrips: [],
        visitedCount: 0
      };
      localStorage.setItem("user_" + email, JSON.stringify(newUser));
      localStorage.setItem("active_user", JSON.stringify(newUser));
      triggerConfetti();
      onLoginSuccess(newUser);
      onClose();
    } else {
      // Login
      const savedUser = localStorage.getItem("user_" + email);
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (password === "password" || password.length >= 4) { // Allow simple login
          localStorage.setItem("active_user", JSON.stringify(user));
          triggerConfetti();
          onLoginSuccess(user);
          onClose();
        } else {
          setError("Incorrect password. Use any password 4+ chars long.");
        }
      } else {
        // Create auto profile for demo
        const defaultUser = {
          name: email.split("@")[0].toUpperCase(),
          email,
          badge: "Orange City Explorer",
          savedTrips: [
            { id: 1, name: "Monsoon Retreat to Khekranala", days: 2, cost: "₹4,200" },
            { id: 2, name: "Weekend Wildlife Safari at Pench", days: 3, cost: "₹12,500" }
          ],
          visitedCount: 2
        };
        localStorage.setItem("user_" + email, JSON.stringify(defaultUser));
        localStorage.setItem("active_user", JSON.stringify(defaultUser));
        triggerConfetti();
        onLoginSuccess(defaultUser);
        onClose();
      }
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(10, 14, 20, 0.8)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      animation: "fadeIn 0.2s ease-out"
    }}>
      <div className="glass-panel" style={{
        width: "100%",
        maxWidth: "400px",
        padding: "32px",
        position: "relative",
        border: "1px solid rgba(255, 111, 0, 0.2)",
        animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
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
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", fontWeight: "700" }}>
            {isSignUp ? "Join the Journey" : "Welcome Back"}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
            {isSignUp ? "Discover and plan trips to Nagpur's hidden spots" : "Sign in to access your saved itineraries"}
          </p>
        </div>

        {/* Demo Mode Alert */}
        <div style={{
          display: "flex",
          gap: "10px",
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.2)",
          borderRadius: "8px",
          padding: "10px 12px",
          marginBottom: "20px",
          fontSize: "0.78rem",
          color: "#fbbf24"
        }}>
          <ShieldAlert size={18} style={{ flexShrink: 0 }} />
          <div>
            <strong>Demo Account Mode:</strong> Any email works. For password, type <code>password</code> or any characters (min 4 chars) to log in instantly.
          </div>
        </div>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "6px",
            padding: "8px 12px",
            marginBottom: "16px",
            fontSize: "0.8rem",
            color: "#f87171",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {isSignUp && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }}>
                  <User size={16} />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Amar Johar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                  style={{ width: "100%", paddingLeft: "36px" }}
                />
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
                style={{ width: "100%", paddingLeft: "36px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }}>
                <Lock size={16} />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input"
                style={{ width: "100%", paddingLeft: "36px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "10px", padding: "12px" }}
          >
            {isSignUp ? "Create Explorer Account" : "Access Account"}
          </button>
        </form>

        {/* Toggle Account Type */}
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-accent-hover)",
              fontWeight: "600",
              cursor: "pointer",
              marginLeft: "4px"
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
