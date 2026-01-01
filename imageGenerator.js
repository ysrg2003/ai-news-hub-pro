const categories = require('../../categories.json');

// Conceptual icon library - maps keywords to SVG drawing functions
const iconLibrary = {
  network: () => `
    <circle cx="50" cy="50" r="8" fill="currentColor"/>
    <circle cx="30" cy="30" r="6" fill="currentColor"/>
    <circle cx="70" cy="30" r="6" fill="currentColor"/>
    <circle cx="30" cy="70" r="6" fill="currentColor"/>
    <circle cx="70" cy="70" r="6" fill="currentColor"/>
    <line x1="50" y1="50" x2="30" y2="30" stroke="currentColor" stroke-width="1"/>
    <line x1="50" y1="50" x2="70" y2="30" stroke="currentColor" stroke-width="1"/>
    <line x1="50" y1="50" x2="30" y2="70" stroke="currentColor" stroke-width="1"/>
    <line x1="50" y1="50" x2="70" y2="70" stroke="currentColor" stroke-width="1"/>
  `,
  balance: () => `
    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="25" r="3" fill="currentColor"/>
    <rect x="20" y="40" width="15" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
    <rect x="65" y="40" width="15" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
    <line x1="35" y1="40" x2="50" y2="25" stroke="currentColor" stroke-width="1"/>
    <line x1="72.5" y1="40" x2="50" y2="25" stroke="currentColor" stroke-width="1"/>
  `,
  security: () => `
    <rect x="30" y="25" width="40" height="50" fill="none" stroke="currentColor" stroke-width="2" rx="3"/>
    <path d="M 50 35 L 50 50" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="60" r="4" fill="currentColor"/>
  `,
  innovation: () => `
    <path d="M 50 20 L 60 40 L 80 40 L 65 52 L 72 72 L 50 60 L 28 72 L 35 52 L 20 40 L 40 40 Z" fill="none" stroke="currentColor" stroke-width="2"/>
  `,
  growth: () => `
    <polyline points="20,70 35,50 50,60 65,30 80,40" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="20" cy="70" r="3" fill="currentColor"/>
    <circle cx="35" cy="50" r="3" fill="currentColor"/>
    <circle cx="50" cy="60" r="3" fill="currentColor"/>
    <circle cx="65" cy="30" r="3" fill="currentColor"/>
    <circle cx="80" cy="40" r="3" fill="currentColor"/>
  `,
  brain: () => `
    <circle cx="35" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="65" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 40 48 Q 50 55 60 48" fill="none" stroke="currentColor" stroke-width="2"/>
    <line x1="50" y1="48" x2="50" y2="65" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="70" r="3" fill="currentColor"/>
  `,
  vision: () => `
    <ellipse cx="50" cy="50" rx="15" ry="10" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="50" r="5" fill="currentColor"/>
    <line x1="35" y1="50" x2="20" y2="50" stroke="currentColor" stroke-width="2"/>
    <line x1="65" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="2"/>
  `,
  robot: () => `
    <rect x="35" y="25" width="30" height="25" fill="none" stroke="currentColor" stroke-width="2" rx="2"/>
    <rect x="30" y="50" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2" rx="2"/>
    <circle cx="42" cy="35" r="2" fill="currentColor"/>
    <circle cx="58" cy="35" r="2" fill="currentColor"/>
    <rect x="40" y="60" width="5" height="15" fill="none" stroke="currentColor" stroke-width="1"/>
    <rect x="55" y="60" width="5" height="15" fill="none" stroke="currentColor" stroke-width="1"/>
  `,
  lightning: () => `
    <polygon points="50,20 60,45 45,45 55,75 30,50 45,50" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  `,
  default: () => `
    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 50 30 L 50 70 M 30 50 L 70 50" stroke="currentColor" stroke-width="2"/>
  `,
};

// Background pattern generators
const patternGenerators = {
  gradient: (primary, secondary) => `
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${primary};stop-opacity:0.1" />
        <stop offset="100%" style="stop-color:${secondary};stop-opacity:0.05" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
  `,
  waves: (primary, secondary) => `
    <defs>
      <pattern id="waves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0,20 Q10,10 20,20 T40,20" stroke="${primary}" stroke-width="1" fill="none" opacity="0.1"/>
        <path d="M0,30 Q10,20 20,30 T40,30" stroke="${secondary}" stroke-width="1" fill="none" opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#waves)"/>
  `,
  dots: (primary, secondary) => `
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="${primary}" opacity="0.1"/>
        <circle cx="10" cy="10" r="1" fill="${secondary}" opacity="0.15"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)"/>
  `,
  grid: (primary, secondary) => `
    <defs>
      <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${primary}" stroke-width="0.5" opacity="0.1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  `,
  spiral: (primary, secondary) => `
    <defs>
      <pattern id="spiral" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M25,25 Q35,25 35,35 Q35,45 25,45 Q15,45 15,35 Q15,25 25,25" stroke="${primary}" stroke-width="1" fill="none" opacity="0.1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#spiral)"/>
  `,
  hexagons: (primary, secondary) => `
    <defs>
      <pattern id="hex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <polygon points="20,5 35,12 35,28 20,35 5,28 5,12" fill="none" stroke="${primary}" stroke-width="1" opacity="0.1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)"/>
  `,
  lines: (primary, secondary) => `
    <defs>
      <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="20" y2="20" stroke="${primary}" stroke-width="1" opacity="0.1"/>
        <line x1="20" y1="0" x2="0" y2="20" stroke="${secondary}" stroke-width="1" opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lines)"/>
  `,
  circles: (primary, secondary) => `
    <defs>
      <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="15" fill="none" stroke="${primary}" stroke-width="1" opacity="0.1"/>
        <circle cx="20" cy="20" r="8" fill="none" stroke="${secondary}" stroke-width="1" opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circles)"/>
  `,
};

function generateArticleCoverImage(title, categoryId, conceptualIcon) {
  // Get category info
  const category = categories.find(c => c.id === categoryId);
  if (!category) {
    console.warn(`Category ${categoryId} not found, using default colors`);
  }

  const colors = category ? category.colorPalette : { primary: '#6366F1', secondary: '#818CF8' };
  const patternType = category ? category.backgroundPattern : 'gradient';

  // Get icon function
  const iconKey = conceptualIcon.toLowerCase().replace(/\s+/g, '');
  const iconFunc = iconLibrary[iconKey] || iconLibrary.default;

  // Get pattern generator
  const patternFunc = patternGenerators[patternType] || patternGenerators.gradient;

  // Create SVG
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
      <!-- Background -->
      <rect width="1200" height="630" fill="${colors.primary}"/>
      
      <!-- Pattern -->
      <g opacity="0.3">
        ${patternFunc(colors.primary, colors.secondary)}
      </g>
      
      <!-- Accent gradient overlay -->
      <defs>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#accentGrad)"/>
      
      <!-- Icon on the left -->
      <g transform="translate(100, 150)" color="${colors.secondary}">
        <g transform="scale(2)">
          ${iconFunc()}
        </g>
      </g>
      
      <!-- Title -->
      <text x="350" y="150" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif" text-anchor="start" word-spacing="9999">
        ${escapeXml(title.substring(0, 40))}
      </text>
      <text x="350" y="220" font-size="48" font-weight="bold" fill="white" font-family="Arial, sans-serif" text-anchor="start" word-spacing="9999">
        ${escapeXml(title.substring(40, 80))}
      </text>
      
      <!-- Category label -->
      <rect x="350" y="280" width="auto" height="40" fill="${colors.secondary}" rx="5" padding="10"/>
      <text x="365" y="310" font-size="18" fill="white" font-family="Arial, sans-serif" font-weight="600">
        ${escapeXml(category ? category.name : 'AI News')}
      </text>
      
      <!-- Decorative elements -->
      <circle cx="1100" cy="100" r="80" fill="${colors.accent}" opacity="0.2"/>
      <circle cx="1150" cy="550" r="100" fill="${colors.secondary}" opacity="0.15"/>
    </svg>
  `;

  return svg;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function svgToBase64(svg) {
  return Buffer.from(svg).toString('base64');
}

module.exports = {
  generateArticleCoverImage,
  svgToBase64,
};
