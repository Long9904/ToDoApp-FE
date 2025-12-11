import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function WeatherMQTT() {
  const [weather, setWeather] = useState<any>(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      setStatus("Connected to MQTT");
      client.subscribe("out/weather");
    });

    client.on("error", () => {
      setStatus("Connection failed");
    });

    client.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("Topic:", topic, "Message:", data);
        setWeather(data);
      } catch (err) {
        console.error("Invalid JSON", err);
      }
    });

    // Cleanup
    return () => {
      client.end();
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌤 Weather Live Data</h2>
      <p style={styles.status}>{status}</p>

      {weather ? (
        <div style={styles.card}>
          <p>
            <b>City:</b> {weather.city}
          </p>
          <p>
            <b>Temperature:</b> {weather.temp}°C
          </p>
          <p>
            <b>Humidity:</b> {weather.humidity}%
          </p>
          <p>
            <b>Condition:</b> {weather.desc}
          </p>
        </div>
      ) : (
        <p>No data received yet...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    maxWidth: "350px",
    margin: "20px auto",
    background: "#f7f7f7",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
  },
  status: {
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  card: {
    padding: "10px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.15)",
  },
} as const;
