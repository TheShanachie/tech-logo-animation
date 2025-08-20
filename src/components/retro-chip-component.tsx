import React, { useState, useEffect } from 'react';

const RetroChipComponent = ({
  size = 'medium',
  text = 'BG',
  showStripes = true,
  enableAnimation = true,
  backgroundColor = '#f5e6d3',
  containerMode = 'inline', // 'inline' | 'fill' | 'fixed'
  borderWidth = 3,
  borderColor = '#2a2a2a',
  borderStyle = 'solid',
  borderRadius = 12,
  padding = 20,
  className = '',
  style = {},
  colorScheme = 'default' // Allow custom color schemes
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(0);

  // Color palette object
  const colors = {
    background: backgroundColor || '#f5e6d3',
    border: borderColor || '#2a2a2a',
    chipOuter: '#1f2f2a',
    chipInner: '#89b097',
    text: '#1f2f2a',
    led: '#c5d4c8',
    ledGlow: 'rgba(255,255,255,0.8)',
    indicator: '#8b6544',
    shadowDark: 'rgba(0,0,0,0.3)',
    shadowLight: 'rgba(0,0,0,0.2)',
    shadowInset: 'rgba(0,0,0,0.1)',
    textShadowHover: 'rgba(0,0,0,0.2)',
    textShadow: 'rgba(0,0,0,0.1)',
    stripeTop: '#d4924b',
    stripeMiddle: '#6bb5c7',
    stripeBottom: '#7b6b9f'
  };

  // Size presets
  const sizeMap = {
    small: 140,
    medium: 280,
    large: 420
  };
  
  const chipSize = typeof size === 'number' ? size : sizeMap[size] || sizeMap.medium;
  const pinWidth = chipSize * 0.057;
  const pinLength = chipSize * 0.114;
  const pinGap = chipSize * 0.043;
  const chipBorderRadius = chipSize * 0.086;
  const chipTotalSize = chipSize + pinLength * 2 + 40;
  const containerTotalSize = chipTotalSize + (padding * 2);

  useEffect(() => {
    if (!enableAnimation) return;
    
    const interval = setInterval(() => {
      setPulseAnimation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [enableAnimation]);

  // Container styles based on mode
  const getContainerStyles = () => {
    const baseStyles = {
      border: `${borderWidth}px ${borderStyle} ${colors.border}`,
      borderRadius: `${borderRadius}px`,
      backgroundColor: colors.background,
      padding: `${padding}px`,
      position: 'relative',
      boxSizing: 'border-box',
      ...style
    };

    switch (containerMode) {
      case 'fill':
        return {
          ...baseStyles,
          width: '100%',
          height: '100%',
          minHeight: `${containerTotalSize}px`,
          minWidth: `${containerTotalSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'fixed':
        return {
          ...baseStyles,
          width: `${containerTotalSize}px`,
          height: `${containerTotalSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'inline':
      default:
        return {
          ...baseStyles,
          display: 'inline-flex',
          width: `${containerTotalSize}px`,
          height: `${containerTotalSize}px`,
          alignItems: 'center',
          justifyContent: 'center'
        };
    }
  };

  return (
    <div 
      className={`RetroMicrochipContainer ${className}`}
      style={getContainerStyles()}
      data-component="retro-microchip"
      data-size={size}
      data-mode={containerMode}
    >
      {/* Background stripes - moved to container level */}
      {showStripes && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
            borderRadius: `${borderRadius}px`
          }}
        >
          <div 
            style={{ 
              height: `${chipSize * 0.25}px`,
              backgroundColor: colors.stripeTop
            }}
          />
          <div 
            style={{ 
              height: `${chipSize * 0.25}px`,
              backgroundColor: colors.stripeMiddle
            }}
          />
          <div 
            style={{ 
              height: `${chipSize * 0.25}px`,
              backgroundColor: colors.stripeBottom
            }}
          />
        </div>
      )}

      {/* Inner content wrapper */}
      <div 
        style={{
          width: `${chipTotalSize}px`,
          height: `${chipTotalSize}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          isolation: 'isolate',
          zIndex: 1
        }}
      >

        {/* Main chip */}
        <div 
          className="retro-chip-main"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: enableAnimation && isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
            width: `${chipSize + pinLength * 2 + 16}px`,
            height: `${chipSize + pinLength * 2 + 16}px`,
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Chip outer shell with pins */}
          <div 
            style={{ 
              position: 'absolute',
              backgroundColor: colors.chipOuter,
              borderRadius: `${chipBorderRadius}px`,
              boxShadow: isHovered ? `0 20px 40px ${colors.shadowDark}` : `0 10px 30px ${colors.shadowLight}`,
              width: `${chipSize + 16}px`,
              height: `${chipSize + 16}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Top Pins */}
            <div 
              style={{
                position: 'absolute',
                top: `-${pinLength}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: `${pinGap}px`
              }}
            >
              {[...Array(7)].map((_, i) => (
                <div 
                  key={`top-${i}`}
                  style={{ 
                    width: `${pinWidth}px`,
                    height: `${pinLength}px`,
                    borderRadius: `${pinWidth/2}px ${pinWidth/2}px 0 0`,
                    backgroundColor: colors.chipOuter,
                    opacity: enableAnimation && isHovered ? 
                      Math.sin((pulseAnimation + i * 30) * Math.PI / 180) * 0.3 + 0.7 : 1,
                    transition: 'opacity 0.1s ease'
                  }}
                />
              ))}
            </div>

            {/* Bottom Pins */}
            <div 
              style={{
                position: 'absolute',
                bottom: `-${pinLength}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: `${pinGap}px`
              }}
            >
              {[...Array(7)].map((_, i) => (
                <div 
                  key={`bottom-${i}`}
                  style={{ 
                    width: `${pinWidth}px`,
                    height: `${pinLength}px`,
                    borderRadius: `0 0 ${pinWidth/2}px ${pinWidth/2}px`,
                    backgroundColor: '#1f2f2a',
                    opacity: enableAnimation && isHovered ? 
                      Math.sin((pulseAnimation + i * 30 + 180) * Math.PI / 180) * 0.3 + 0.7 : 1,
                    transition: 'opacity 0.1s ease'
                  }}
                />
              ))}
            </div>

            {/* Left Pins */}
            <div 
              style={{
                position: 'absolute',
                left: `-${pinLength}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: `${pinGap}px`
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div 
                  key={`left-${i}`}
                  style={{ 
                    width: `${pinLength}px`,
                    height: `${pinWidth}px`,
                    borderRadius: `${pinWidth/2}px 0 0 ${pinWidth/2}px`,
                    backgroundColor: '#1f2f2a',
                    opacity: enableAnimation && isHovered ? 
                      Math.sin((pulseAnimation + i * 40 + 90) * Math.PI / 180) * 0.3 + 0.7 : 1,
                    transition: 'opacity 0.1s ease'
                  }}
                />
              ))}
            </div>

            {/* Right Pins */}
            <div 
              style={{
                position: 'absolute',
                right: `-${pinLength}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: `${pinGap}px`
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div 
                  key={`right-${i}`}
                  style={{ 
                    width: `${pinLength}px`,
                    height: `${pinWidth}px`,
                    borderRadius: `0 ${pinWidth/2}px ${pinWidth/2}px 0`,
                    backgroundColor: '#1f2f2a',
                    opacity: enableAnimation && isHovered ? 
                      Math.sin((pulseAnimation + i * 40 + 270) * Math.PI / 180) * 0.3 + 0.7 : 1,
                    transition: 'opacity 0.1s ease'
                  }}
                />
              ))}
            </div>

            {/* Chip inner body (green part) */}
            <div 
              style={{ 
                position: 'absolute',
                backgroundColor: colors.chipInner,
                width: `${chipSize}px`,
                height: `${chipSize}px`,
                borderRadius: `${chipBorderRadius - 4}px`,
                boxShadow: `inset 0 2px 10px ${colors.shadowInset}`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Status LEDs */}
              <div 
                style={{
                  position: 'absolute',
                  top: `${chipSize * 0.08}px`,
                  left: `${chipSize * 0.08}px`,
                  display: 'flex',
                  gap: `${chipSize * 0.04}px`
                }}
              >
                <div 
                  style={{ 
                    width: `${chipSize * 0.086}px`,
                    height: `${chipSize * 0.086}px`,
                    borderRadius: '50%',
                    backgroundColor: colors.led,
                    boxShadow: isHovered ? `0 0 10px ${colors.ledGlow}` : 
                      `inset 0 1px 3px ${colors.shadowLight}`,
                    animation: enableAnimation && isHovered ? 'retro-chip-pulse 1s infinite' : 'none'
                  }}
                />
                <div 
                  style={{ 
                    width: `${chipSize * 0.086}px`,
                    height: `${chipSize * 0.086}px`,
                    borderRadius: '50%',
                    backgroundColor: colors.led,
                    boxShadow: isHovered ? `0 0 10px ${colors.ledGlow}` : 
                      `inset 0 1px 3px ${colors.shadowLight}`,
                    animation: enableAnimation && isHovered ? 'retro-chip-pulse 1s infinite 0.5s' : 'none'
                  }}
                />
              </div>

              {/* Text */}
              <h1 
                style={{ 
                  fontSize: `${chipSize * 0.45}px`,
                  fontWeight: 900,
                  color: colors.text,
                  letterSpacing: '-0.05em',
                  margin: 0,
                  textShadow: isHovered ? `3px 3px 0 ${colors.textShadowHover}` : `2px 2px 0 ${colors.textShadow}`,
                  transform: enableAnimation && isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.3s ease',
                  userSelect: 'none'
                }}
              >
                {text}
              </h1>

              {/* Bottom indicator */}
              <div 
                style={{ 
                  position: 'absolute',
                  bottom: `${chipSize * 0.08}px`,
                  right: `${chipSize * 0.08}px`,
                  width: `${chipSize * 0.114}px`,
                  height: `${chipSize * 0.114}px`,
                  borderRadius: `${chipSize * 0.014}px`,
                  backgroundColor: colors.indicator,
                  boxShadow: `inset 0 1px 3px ${colors.shadowDark}`,
                  opacity: isHovered ? 0.9 : 0.7,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes retro-chip-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .RetroMicrochipContainer {
          /* Custom styles can be added here via className */
        }
        
        .RetroMicrochipContainer * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default RetroChipComponent;