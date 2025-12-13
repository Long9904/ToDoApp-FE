import AirQualityCard from "./AirQualityCard";
import ClockSetting from "./ClockSetting";
import ScheduleCard from "./ScheduleCard";
import WeatherCard from "./WeatherCard";
import mqtt from "mqtt";
import { useEffect, useState } from "react";

export default function MqttSettings() {
  const [weather, setWeather] = useState<any>(null);
  const [airData, setAirData] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [showCitySelect, setShowCitySelect] = useState(false);

  useEffect(() => {
    const c = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    setClient(c);

    c.on("connect", () => {
      c.subscribe("out/weather");
      c.subscribe("out/air-quality");
    });

    c.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        if (topic === "out/weather") {
          setWeather(data);
        } else if (topic === "out/air-quality") {
          setAirData(data);
          console.log(data);
        }
      } catch (err) {
        console.error("Invalid JSON", err);
      }
    });

    return () => {
      if (c.connected) {
        c.end(true);
      }
    };
  }, []);

  const handleCitySelect = (city: string) => {
    if (!client) return;
    client.publish("home/location", city);
    setShowCitySelect(false);
  };

  const handleTimeSet = (data: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    utcOffset: number;
  }) => {
    if (!client) return;
    client.publish("set/clock", JSON.stringify(data));
    console.log("Time set:", data);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          style={{
            fontFamily: "var(--font-family)",
          }}
        >
          <WeatherCard
            weather={weather}
            onCitySelect={handleCitySelect}
            showCitySelect={showCitySelect}
            setShowCitySelect={setShowCitySelect}
          />
          <AirQualityCard airData={airData} />
          <ScheduleCard />
          <ClockSetting onTimeSet={handleTimeSet} />
        </div>
      </div>
    </div>
  );
}
