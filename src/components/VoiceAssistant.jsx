import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, X, HelpCircle, MessageSquare } from "lucide-react";
import { PLACES_DATA } from "../data/places";

export default function VoiceAssistant({ activeTab, setActiveTab, onSelectPlaceOnMap, onOpenPlaceDetails }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN"; // Set to Indian English accent
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("Listening...");
      setResponse("");
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setTranscript("Error: Could not hear. Try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      processVoiceCommand(speechToText);
    };

    recognitionRef.current = recognition;
  }, []);

  const speakText = (text) => {
    if (!speechEnabled || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN"; // Indian English voice accent
    
    // Find an English voice if possible
    const voices = window.speechSynthesis.getVoices();
    const indVoice = voices.find(voice => voice.lang.includes("IN") || voice.lang.includes("EN"));
    if (indVoice) utterance.voice = indVoice;

    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const processVoiceCommand = (commandText) => {
    const text = commandText.toLowerCase();
    let speechReply = "I heard you, but I don't know that command. Try saying 'show places' or 'find food'.";

    // 1. Navigation Commands
    if (text.includes("explore") || text.includes("gems") || text.includes("place") || text.includes("sightseeing")) {
      setActiveTab("explore");
      speechReply = "Opening Nagpur hidden gems list for you. Have a look!";
      setResponse(speechReply);
      speakText(speechReply);
      return;
    }

    if (text.includes("map") || text.includes("locate") || text.includes("route")) {
      setActiveTab("map");
      speechReply = "Opening the interactive route map of Nagpur.";
      setResponse(speechReply);
      speakText(speechReply);
      return;
    }

    if (text.includes("food") || text.includes("saoji") || text.includes("eat") || text.includes("curry") || text.includes("poha")) {
      setActiveTab("food");
      speechReply = "Showing Nagpur's famous Saoji curries and Tarri Poha hotspots!";
      setResponse(speechReply);
      speakText(speechReply);
      return;
    }

    if (text.includes("plan") || text.includes("trip") || text.includes("itinerary") || text.includes("budget")) {
      setActiveTab("planner");
      speechReply = "Welcome to the AI Trip Planner. Adjust the budget sliders to customize your trip.";
      setResponse(speechReply);
      speakText(speechReply);
      return;
    }

    // 2. Specific Location Commands
    const spots = [
      { key: "pench", name: "Pench National Park", reply: "Pench is a beautiful wildlife sanctuary. It inspired the Jungle Book. Showing you Pench on the map!" },
      { key: "ramtek", name: "Ramtek Hill Temple", reply: "Ramtek has ancient stone temples on a hill fort, associated with poet Kalidasa. Locating Ramtek!" },
      { key: "khekranala", name: "Khekranala Reservoir", reply: "Khekranala is a green lakeside forest resort, best visited during monsoons. Locating Khekranala!" },
      { key: "deekshabhoomi", name: "Deekshabhoomi Stupa", reply: "Deekshabhoomi is Asia's largest Buddhist stupa, located right inside Nagpur. Locating Stupa!" },
      { key: "futala", name: "Futala Lake", reply: "Futala Lake is famous for evening promenade walks and street food. Locating Futala Lake!" },
      { key: "umred", name: "Umred Karhandla", reply: "Umred Karhandla is a dense forest sanctuary famous for tiger safaris. Locating Karhandla!" },
      { key: "zilpi", name: "Zilpi Lake", reply: "Zilpi is a quiet lake surrounded by green valleys, perfect for sunset cycle trips. Locating Zilpi!" },
      { key: "koradi", name: "Koradi Temple", reply: "Koradi Temple is a sacred shrine with a new modern plaza and cultural laser light show. Locating Koradi!" },
      { key: "adasa", name: "Adasa Ganesha", reply: "Adasa features an ancient 12-foot monolithic Lord Ganesha statue carved out of a single rock. Locating Adasa!" },
      { key: "waki", name: "Waki Woods", reply: "Waki Woods offers river boating, camping, and a Sufi shrine on the banks of Kanhan river. Locating Waki!" }
    ];

    for (let s of spots) {
      if (text.includes(s.key)) {
        onSelectPlaceOnMap(s.key);
        setActiveTab("map");
        speechReply = s.reply;
        setResponse(speechReply);
        speakText(speechReply);
        return;
      }
    }

    // 3. Greetings
    if (text.includes("hello") || text.includes("hi ") || text.includes("hey")) {
      speechReply = "Hello! I am your Nagpur travel guide. Ask me to open places, maps, or find Saoji food.";
      setResponse(speechReply);
      speakText(speechReply);
      return;
    }

    setResponse(speechReply);
    speakText(speechReply);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Already listening:", err);
      }
    } else {
      setTranscript("Speech recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1200 }}>
      {/* Floating Activator Mic Button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); startListening(); }}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-accent), #e65c00)",
            color: "white",
            border: "none",
            boxShadow: "0 4px 20px rgba(255, 111, 0, 0.5), var(--shadow-glow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all var(--transition-fast)",
            position: "relative"
          }}
          className="btn-mic-glow"
        >
          <Mic size={24} />
          {/* Pulsing Ring when listening */}
          {isListening && (
            <div style={{
              position: "absolute",
              top: "-5px",
              left: "-5px",
              right: "-5px",
              bottom: "-5px",
              border: "2px solid var(--color-accent)",
              borderRadius: "50%",
              animation: "pulseRing 1.5s infinite"
            }} />
          )}
        </button>
      )}

      {/* Floating Panel when Open */}
      {isOpen && (
        <div className="glass-panel" style={{
          width: "320px",
          padding: "20px",
          border: "1px solid rgba(255, 111, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          animation: "slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "var(--shadow-lg), 0 0 30px rgba(0,0,0,0.5)"
        }}>
          {/* Panel Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isListening ? "var(--color-accent)" : "var(--text-muted)",
                animation: isListening ? "pulseRing 1s infinite" : "none"
              }} />
              <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>Voice Guide</strong>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              {/* Toggle Speech Synthesis */}
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer"
                }}
                title={speechEnabled ? "Mute Voice Output" : "Unmute Voice Output"}
              >
                {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} color="#ef4444" />}
              </button>
              
              {/* Close Button */}
              <button
                onClick={() => { setIsOpen(false); stopListening(); }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer"
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Voice Wave Animation when listening */}
          {isListening && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              height: "36px"
            }}>
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: "100%",
                    background: "var(--color-accent)",
                    transformOrigin: "bottom",
                    animation: `wave 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    borderRadius: "2px"
                  }}
                />
              ))}
            </div>
          )}

          {/* Transcript bubbles */}
          <div style={{
            background: "rgba(0, 0, 0, 0.2)",
            border: "1px solid var(--glass-border)",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "0.82rem",
            maxHeight: "140px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            {transcript && (
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>You said:</span>
                <span style={{ color: "white", fontWeight: "500" }}>"{transcript}"</span>
              </div>
            )}
            
            {response && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--color-accent-hover)", display: "block" }}>Guide:</span>
                <span style={{ color: "var(--text-secondary)" }}>{response}</span>
              </div>
            )}

            {!transcript && !response && (
              <span style={{ color: "var(--text-muted)", fontStyle: "italic", textAlign: "center" }}>
                "Try saying: 'Show Pench National Park', 'Plan my trip' or 'Recommend Saoji Food'"
              </span>
            )}
          </div>

          {/* Mic controls */}
          <button
            onClick={isListening ? stopListening : startListening}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "10px",
              fontSize: "0.85rem",
              background: isListening ? "#ef4444" : "linear-gradient(135deg, var(--color-accent), #e65c00)",
              boxShadow: isListening ? "0 4px 12px rgba(239, 68, 68, 0.3)" : "0 4px 12px rgba(255, 111, 0, 0.3)"
            }}
          >
            {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            <span>{isListening ? "Stop Listening" : "Tap to Speak"}</span>
          </button>
        </div>
      )}

      <style>{`
        .btn-mic-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 24px rgba(255, 111, 0, 0.7), var(--shadow-glow);
        }
      `}</style>
    </div>
  );
}
