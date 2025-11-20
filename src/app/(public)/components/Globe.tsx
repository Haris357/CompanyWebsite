'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface City {
  name: string;
  x: number; // Percentage position on map (0-100)
  y: number; // Percentage position on map (0-100)
  selected?: boolean;
}

const cities: City[] = [
  { name: 'San Francisco', x: 15, y: 38, selected: true },
  { name: 'New York', x: 22, y: 40 },
  { name: 'London', x: 49, y: 35 },
  { name: 'Paris', x: 50, y: 37 },
  { name: 'Tokyo', x: 83, y: 38 },
  { name: 'Sydney', x: 87, y: 70 },
  { name: 'Singapore', x: 76, y: 51 },
  { name: 'Mumbai', x: 68, y: 44 },
  { name: 'Dubai', x: 62, y: 42 },
  { name: 'São Paulo', x: 32, y: 68 },
];

// Generate dots for continents on flat map
const generateWorldDots = () => {
  const dots: { x: number; y: number }[] = [];

  // North America
  for (let x = 10; x < 28; x += 1.5) {
    for (let y = 25; y < 50; y += 1.5) {
      if (
        (x > 12 && x < 25 && y > 30 && y < 48) || // USA/Canada
        (x > 15 && x < 22 && y > 48 && y < 52)    // Mexico
      ) {
        dots.push({ x, y });
      }
    }
  }

  // South America
  for (let x = 20; x < 35; x += 1.5) {
    for (let y = 52; y < 75; y += 1.5) {
      if (x > 22 && x < 33) {
        dots.push({ x, y });
      }
    }
  }

  // Europe
  for (let x = 45; x < 60; x += 1.5) {
    for (let y = 28; y < 45; y += 1.5) {
      dots.push({ x, y });
    }
  }

  // Africa
  for (let x = 45; x < 62; x += 1.5) {
    for (let y = 45; y < 72; y += 1.5) {
      if (x > 47 && x < 60) {
        dots.push({ x, y });
      }
    }
  }

  // Asia
  for (let x = 60; x < 90; x += 1.5) {
    for (let y = 25; y < 55; y += 1.5) {
      if (
        (x > 62 && x < 88 && y > 28 && y < 50) ||
        (x > 70 && x < 85 && y > 50 && y < 54)
      ) {
        dots.push({ x, y });
      }
    }
  }

  // Australia
  for (let x = 82; x < 92; x += 1.5) {
    for (let y = 65; y < 75; y += 1.5) {
      dots.push({ x, y });
    }
  }

  return dots;
};

export default function Globe() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const worldDots = generateWorldDots();

  const selectedCity = cities.find(c => c.selected);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 80"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      >
        <defs>
          {/* Glow filters */}
          <filter id="cityGlow">
            <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
          </linearGradient>

          <radialGradient id="selectedGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="100" height="80" fill="rgba(0, 0, 0, 0.3)" rx="2" />

        {/* Grid lines */}
        <g opacity="0.1">
          {/* Horizontal lines */}
          {[0, 20, 40, 60, 80].map((y) => (
            <line
              key={`h-${y}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="0.1"
            />
          ))}
          {/* Vertical lines */}
          {[0, 25, 50, 75, 100].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="80"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="0.1"
            />
          ))}
        </g>

        {/* World map dots (continents) */}
        {worldDots.map((dot, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={0.3}
            fill="rgba(200, 200, 200, 0.5)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: 1
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: i * 0.01,
              },
              scale: {
                duration: 0.5,
                delay: i * 0.002,
              }
            }}
          />
        ))}

        {/* Connection lines between selected city and others */}
        {selectedCity && cities.map((city, i) => {
          if (city.selected) return null;

          const midX = (selectedCity.x + city.x) / 2;
          const midY = (selectedCity.y + city.y) / 2 - 5;

          return (
            <g key={`connection-${i}`}>
              {/* Main connection line */}
              <motion.path
                d={`M ${selectedCity.x} ${selectedCity.y} Q ${midX} ${midY} ${city.x} ${city.y}`}
                fill="none"
                stroke="url(#connectionLine)"
                strokeWidth="0.2"
                opacity="0.5"
                strokeDasharray="1,1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />

              {/* Animated particle along line */}
              <motion.circle r="0.4" fill="rgba(59, 130, 246, 0.9)" filter="url(#cityGlow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={`M ${selectedCity.x} ${selectedCity.y} Q ${midX} ${midY} ${city.x} ${city.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.2;0.8;1"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </motion.circle>
            </g>
          );
        })}

        {/* City markers */}
        {cities.map((city, index) => {
          const isSelected = city.selected;
          const isHovered = hoveredCity === city.name;

          return (
            <g
              key={city.name}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Selected city - blue pulsing rings */}
              {isSelected && (
                <>
                  {/* Outer pulsing ring */}
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={2}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.6)"
                    strokeWidth="0.2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Middle ring */}
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={1.5}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.8)"
                    strokeWidth="0.2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />

                  {/* Background glow */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={2.5}
                    fill="rgba(59, 130, 246, 0.2)"
                    filter="url(#strongGlow)"
                  />
                </>
              )}

              {/* Regular city - pulsing ring */}
              {!isSelected && (
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={1.2}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="0.15"
                  animate={{
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              )}

              {/* Outer glow */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={1}
                fill={isSelected ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.2)'}
                filter="url(#cityGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              />

              {/* Main marker */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={0.6}
                fill={isSelected ? 'rgba(59, 130, 246, 1)' : 'rgba(255, 255, 255, 0.9)'}
                filter="url(#cityGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              />

              {/* Inner bright core */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={0.25}
                fill="white"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />

              {/* City label on hover or selected */}
              {(isHovered || isSelected) && (
                <motion.g
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Label background */}
                  <rect
                    x={city.x + 1}
                    y={city.y - 1.5}
                    width={city.name.length * 0.6 + 1}
                    height="1.8"
                    rx="0.3"
                    fill="rgba(0, 0, 0, 0.9)"
                    stroke={isSelected ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.3)'}
                    strokeWidth="0.1"
                  />
                  {/* Label text */}
                  <text
                    x={city.x + 1.5}
                    y={city.y - 0.2}
                    fontSize="1"
                    fill={isSelected ? 'rgba(59, 130, 246, 1)' : 'white'}
                    fontWeight="600"
                  >
                    {city.name}
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
