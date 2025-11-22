'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
  { name: 'Berlin', x: 51, y: 34 },
  { name: 'Moscow', x: 58, y: 30 },
  { name: 'Toronto', x: 20, y: 38 },
  { name: 'Mexico City', x: 17, y: 45 },
  { name: 'Bangkok', x: 74, y: 48 },
];

// Generate dots for continents on flat map - More detailed
const generateWorldDots = () => {
  const dots: { x: number; y: number }[] = [];
  const spacing = 1.2; // Denser dots

  // North America
  for (let x = 10; x < 28; x += spacing) {
    for (let y = 25; y < 52; y += spacing) {
      if (
        (x > 12 && x < 25 && y > 28 && y < 48) || // USA/Canada
        (x > 15 && x < 22 && y > 48 && y < 52) || // Mexico
        (x > 10 && x < 15 && y > 32 && y < 40)    // Alaska area
      ) {
        dots.push({ x, y });
      }
    }
  }

  // South America
  for (let x = 20; x < 35; x += spacing) {
    for (let y = 52; y < 76; y += spacing) {
      if (x > 22 && x < 33 && y > 52 && y < 75) {
        dots.push({ x, y });
      }
    }
  }

  // Europe
  for (let x = 45; x < 62; x += spacing) {
    for (let y = 26; y < 45; y += spacing) {
      if (x > 46 && x < 60 && y > 28 && y < 43) {
        dots.push({ x, y });
      }
    }
  }

  // Africa
  for (let x = 45; x < 63; x += spacing) {
    for (let y = 42; y < 74; y += spacing) {
      if (x > 47 && x < 61 && y > 43 && y < 73) {
        dots.push({ x, y });
      }
    }
  }

  // Asia
  for (let x = 58; x < 92; x += spacing) {
    for (let y = 22; y < 56; y += spacing) {
      if (
        (x > 60 && x < 90 && y > 25 && y < 52) ||
        (x > 72 && x < 88 && y > 52 && y < 55)
      ) {
        dots.push({ x, y });
      }
    }
  }

  // Australia
  for (let x = 82; x < 93; x += spacing) {
    for (let y = 64; y < 76; y += spacing) {
      if (x > 83 && x < 92 && y > 65 && y < 75) {
        dots.push({ x, y });
      }
    }
  }

  return dots;
};

export default function Globe() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');

  const worldDots = generateWorldDots();
  const selectedCity = cities.find(c => c.selected);

  // Get CSS variable colors
  useEffect(() => {
    const root = document.documentElement;
    const updateColors = () => {
      const primary = getComputedStyle(root).getPropertyValue('--primary-color').trim() || '#8b5cf6';
      const secondary = getComputedStyle(root).getPropertyValue('--secondary-color').trim() || '#3b82f6';
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
    };

    updateColors();
    // Update colors when they change
    const observer = new MutationObserver(updateColors);
    observer.observe(root, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

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
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dynamic gradients using theme colors - Simplified to primary/secondary */}
          <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="selectedGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.5" />
            <stop offset="50%" stopColor={primaryColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Background with subtle gradient */}
        <rect width="100" height="80" fill="rgba(0, 0, 0, 0.2)" rx="2" />
        <rect width="100" height="80" fill="url(#selectedGlow)" opacity="0.05" rx="2" />

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

        {/* World map dots (continents) - More visible and animated */}
        {worldDots.map((dot, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={0.35}
            fill="url(#dotGradient)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              opacity: {
                duration: 4,
                repeat: Infinity,
                delay: i * 0.008,
                ease: "easeInOut"
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                delay: i * 0.008,
                ease: "easeInOut"
              }
            }}
          />
        ))}

        {/* Connection lines between selected city and others */}
        {selectedCity && cities.map((city, i) => {
          if (city.selected) return null;

          const midX = (selectedCity.x + city.x) / 2;
          const midY = (selectedCity.y + city.y) / 2 - 8;

          return (
            <g key={`connection-${i}`}>
              {/* Main connection line - thicker and more visible */}
              <motion.path
                d={`M ${selectedCity.x} ${selectedCity.y} Q ${midX} ${midY} ${city.x} ${city.y}`}
                fill="none"
                stroke="url(#connectionLine)"
                strokeWidth="0.25"
                opacity="0.6"
                strokeDasharray="1.5,1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
              />

              {/* Animated particles along line - multiple */}
              <motion.circle
                r="0.5"
                fill={primaryColor}
                filter="url(#cityGlow)"
              >
                <animateMotion
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  path={`M ${selectedCity.x} ${selectedCity.y} Q ${midX} ${midY} ${city.x} ${city.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.2;0.8;1"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                />
              </motion.circle>

              {/* Secondary particle with delay */}
              <motion.circle
                r="0.4"
                fill={secondaryColor}
                filter="url(#cityGlow)"
              >
                <animateMotion
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${(i % 3) * 0.5}s`}
                  path={`M ${selectedCity.x} ${selectedCity.y} Q ${midX} ${midY} ${city.x} ${city.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.8;0.8;0"
                  keyTimes="0;0.2;0.8;1"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${(i % 3) * 0.5}s`}
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
              {/* Selected city - pulsing rings with theme colors */}
              {isSelected && (
                <>
                  {/* Outer pulsing ring */}
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={2.5}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="0.3"
                    opacity="0.6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Middle ring */}
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={1.8}
                    fill="none"
                    stroke={secondaryColor}
                    strokeWidth="0.25"
                    opacity="0.8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />

                  {/* Background glow */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={3}
                    fill={primaryColor}
                    opacity="0.15"
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
                r={1.2}
                fill={isSelected ? primaryColor : 'rgba(255, 255, 255, 0.2)'}
                opacity={isSelected ? 0.4 : 0.3}
                filter="url(#cityGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              />

              {/* Main marker */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={0.7}
                fill={isSelected ? primaryColor : 'rgba(255, 255, 255, 0.9)'}
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
                r={0.3}
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
                    x={city.x + 1.2}
                    y={city.y - 1.5}
                    width={city.name.length * 0.65 + 1}
                    height="2"
                    rx="0.4"
                    fill="rgba(0, 0, 0, 0.85)"
                    stroke={isSelected ? primaryColor : 'rgba(255, 255, 255, 0.3)'}
                    strokeWidth="0.15"
                  />
                  {/* Label text */}
                  <text
                    x={city.x + 1.7}
                    y={city.y - 0.1}
                    fontSize="1.1"
                    fill={isSelected ? primaryColor : 'white'}
                    fontWeight="700"
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
