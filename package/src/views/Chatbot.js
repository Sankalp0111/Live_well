import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null); // Persist recognition instance

  // Check if SpeechRecognition is supported
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulating bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a fake bot response!", sender: "bot" },
      ]);
    }, 1000);
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.chatMessage,
              backgroundColor: msg.sender === "bot" ? "#e1e1e1" : "#007bff",
              color: msg.sender === "bot" ? "black" : "white",
              alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
              textAlign: msg.sender === "bot" ? "left" : "right",
            }}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.chatInput}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
        <FaMicrophone
          onClick={handleMicClick}
          style={{
            ...styles.micIcon,
            color: isListening ? "red" : "#007bff",
          }}
        />
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f4f4f4",
    height: "100vh",
    padding: "0",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  chatMessage: {
    padding: "12px",
    margin: "8px",
    borderRadius: "15px",
    maxWidth: "70%",
    fontSize: "16px",
    wordWrap: "break-word",
  },
  chatInput: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    background: "white",
    borderTop: "1px solid #ddd",
    position: "sticky",
    bottom: 0,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    marginLeft: "10px",
    borderRadius: "8px",
    fontSize: "16px",
  },
  micIcon: {
    fontSize: "24px",
    cursor: "pointer",
    marginLeft: "15px",
  },
};

export default ChatBot;
