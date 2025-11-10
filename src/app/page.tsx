"use client";
import { useState, useEffect } from "react";
import logo from "../../public/logo.png";

export default function TransitPass() {
  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const month = now.toLocaleString("en-US", { month: "short" });
    const day = now.getDate();
    const year = now.getFullYear();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setExpiry(`Expires ${month} ${day}, ${year}, ${timeString}`);
  }, []);

  // Fullscreen toggle for mobile (double tap hides browser bars)
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener("dblclick", toggleFullscreen);
    return () => document.removeEventListener("dblclick", toggleFullscreen);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#111] font-sans overflow-hidden flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-3">
        <div className="flex flex-col">
          <h2 className="text-base font-bold leading-tight">CTtransit</h2>
          <span className="text-xs text-gray-700 font-normal leading-tight">
            Show operator your ticket
          </span>
        </div>
        <div className="flex justify-center items-center border border-gray-300 rounded-full text-base w-6 h-6 select-none">
          ×
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center relative text-center flex-1 m-2">
        {/* White background to avoid orange tint */}
        <div className="absolute inset-0 bg-white z-0"></div>

        <div className="relative inline-block mb-12 z-10 mt-1">
          {/* Base white mask */}
          <div className="absolute top-1/2 left-1/2 w-[65vw] h-[65vw] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>

          {/* Two solid orange circles with faster, out-of-sync pulse */}
          <div
            className="absolute top-1/2 left-1/2 w-[38vw] h-[38vw] bg-[#b97714] rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse z-1"
            style={{
              animationDuration: "1.5s",
              animationTimingFunction: "ease-in-out",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-[44vw] h-[44vw] bg-[#c6841a] rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse z-0"
            style={{
              animationDelay: "0.5s",
              animationDuration: "1.5s",
              animationTimingFunction: "ease-in-out",
            }}
          ></div>

          {/* Logo circle */}
          <div className="relative w-[32vw] max-w-[190px] h-[32vw] max-h-[190px] rounded-full border-[#c6841a] bg-white flex items-center justify-center z-10">
            <img
              src={logo.src}
              alt="CTtransit"
              className="w-3/4 h-3/4 object-contain"
            />
          </div>
        </div>

        {/* Clock */}
        <div className="text-[14vw] font-bold tracking-tight pt-10 z-10 mb-6">
          {time}
        </div>
      </main>

      {/* Card */}
      <div className="bg-white shadow-md rounded-lg p-3 w-[90%] max-w-md text-left mb-24 z-10">
        <h3 className="text-base font-bold mb-2 text-gray-800">Adult 2 Hour</h3>
        <p className="text-sm text-gray-700 mb-3 leading-snug">
          Hartford, New Haven, Stamford, Bristol, Meriden, New Britain,
          Waterford, and Waterbury
        </p>
        <p className="text-sm text-gray-800 mt-8 font-bold mb-3">{expiry}</p>
      </div>
    </div>
  );
}
