import React from 'react';

const NexalithLogo = ({ className = '', size = 1, variant = 'full', theme = 'dark' }) => {
    const baseSize = size || 1;
    const brandPrimary = '#0ea5e9'; // Vibrant Clinical Cyan
    const brandSecondary = '#38bdf8'; // Sky Bright
    const textBright = theme === 'dark' ? '#ffffff' : '#0f172a';
    const textSubtle = theme === 'dark' ? '#aedaf2ff' : '#64748b'; // Healthcare blue-tinted subtle

    return (
        <div
            className={`flex items-center select-none ${className}`}
            style={{
                fontSize: `${baseSize}rem`,
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, sans-serif",
                fontStyle: 'normal',
                lineHeight: 1
            }}
        >
            <div className="relative flex items-center pr-1" style={{ height: '3.6em' }}>
                <svg width="4.5em" height="3.6em" viewBox="0 0 100 45" style={{ overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={brandPrimary} />
                            <stop offset="100%" stopColor={brandSecondary} />
                        </linearGradient>
                    </defs>
                    <path
                        d="M10 40 L10 5 L26 5 L44 32 L44 5 L60 5 L60 40 L44 40 L26 13 L26 40 Z"
                        fill="url(#iconGradient)"
                        className="animate-pulse"
                        style={{ animationDuration: '4s' }}
                    />
                </svg>
            </div>

            {/* 2. Bold Vertical Divider */}
            {variant !== 'iconOnly' && (
                <div
                    style={{
                        height: '2.8em',
                        width: '2px',
                        background: `linear-gradient(to bottom, transparent, ${textSubtle}, transparent)`,
                        marginLeft: '1.4em',
                        marginRight: '1.4em',
                        flexShrink: 0,
                        opacity: 0.4
                    }}
                ></div>
            )}

            {/* 3. The Company Wordmark & Tagline */}
            {variant !== 'iconOnly' && (
                <div className="flex flex-col justify-center">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            fontSize: '2.4em',
                            fontWeight: 950,
                            letterSpacing: '-0.04em',
                            whiteSpace: 'nowrap',
                            fontStyle: 'normal'
                        }}
                    >
                        <span style={{ color: textBright }}>Nexalith</span>
                        <span style={{
                            color: brandPrimary,
                            marginLeft: '0.12em',
                            background: `linear-gradient(to right, ${brandPrimary}, ${brandSecondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Portal</span>
                    </div>
                    {variant === 'full' && (
                        <p
                            style={{
                                fontSize: '0.9em',
                                fontWeight: 800,
                                marginTop: '0.15em',
                                color: textSubtle,
                                textTransform: 'uppercase',
                                opacity: 0.9,
                                letterSpacing: '0.28em',
                                fontStyle: 'normal'
                            }}
                        >
                            Clinical Intelligence Interface
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NexalithLogo;
