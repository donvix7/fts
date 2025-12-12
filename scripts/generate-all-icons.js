// Replace the createSourceIcon function with this:
async function createSourceIcon() {
  const sourcePath = path.join(__dirname, '../public/icon-source.png');
  
  // Create icon WITHOUT emojis or complex fonts
  const svgBuffer = Buffer.from(`
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F2A900;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="brownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4A2C2A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="512" cy="512" r="500" fill="url(#goldGradient)"/>
      
      <!-- African pattern element (simplified) -->
      <path d="M300,300 L724,300 L724,724 L300,724 Z" 
            fill="url(#brownGradient)" transform="rotate(45 512 512)"/>
      
      <!-- Simple geometric FTS logo - NO TEXT/EMOJIS -->
      <rect x="412" y="350" width="200" height="80" rx="10" fill="#F5F5DC"/>
      <rect x="412" y="460" width="80" height="200" rx="10" fill="#F5F5DC"/>
      <rect x="532" y="540" width="80" height="120" rx="10" fill="#F5F5DC"/>
      
      <!-- Decorative dots (no text) -->
      <circle cx="380" cy="380" r="30" fill="#F5F5DC" opacity="0.3"/>
      <circle cx="644" cy="380" r="30" fill="#F5F5DC" opacity="0.3"/>
      <circle cx="380" cy="644" r="30" fill="#F5F5DC" opacity="0.3"/>
      <circle cx="644" cy="644" r="30" fill="#F5F5DC" opacity="0.3"/>
    </svg>
  `);

  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(sourcePath);
  
  console.log('✅ Created source icon (no text/emoji)');
  return sourcePath;
}

// Update the shortcut icons generation to avoid emojis:
async function main() {
  // ... existing code ...
  
  // Generate shortcut icons WITHOUT emojis
  const shortcutIcons = [
    { name: 'new', color: '#4A2C2A', symbol: 'N' },
    { name: 'limited', color: '#B22222', symbol: 'L' },
    { name: 'cart', color: '#D4AF37', symbol: 'C' },
    { name: 'lookbook', color: '#006400', symbol: 'V' }  // 'V' for View instead of 👁️
  ];
  
  for (const shortcut of shortcutIcons) {
    const outputPath = path.join(iconsDir, `${shortcut.name}-192x192.png`);
    
    const shortcutSvg = Buffer.from(`
      <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
        <rect width="192" height="192" rx="36" fill="${shortcut.color}"/>
        <text x="96" y="110" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" 
              font-size="64" font-weight="bold" fill="#F5F5DC">${shortcut.symbol}</text>
        <rect width="180" height="180" x="6" y="6" rx="32" fill="none" 
              stroke="#F5F5DC" stroke-width="2"/>
      </svg>
    `);
    
    await sharp(shortcutSvg)
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated shortcut: ${shortcut.name}-192x192.png`);
  }
  
  // ... rest of the code ...
}