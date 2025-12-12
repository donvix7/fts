const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function createScreenshot(width, height, filename, label) {
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  await fs.mkdir(screenshotsDir, { recursive: true });
  
  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>¥¥
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4A2C2A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="20" y="20" width="${width - 40}" height="80" rx="10" fill="#F5F5DC"/>
      <rect x="20" y="120" width="${width - 40}" height="${height - 200}" rx="10" fill="#D4AF37" opacity="0.3"/>
      
      <text x="${width/2}" y="70" text-anchor="middle" font-family="Arial" font-size="24" fill="#4A2C2A">
        From This Side | Premium Fashion
      </text>
      <text x="${width/2}" y="${height/2}" text-anchor="middle" font-family="Arial" font-size="36" fill="#F5F5DC">
        ${label}
      </text>
      <text x="${width/2}" y="${height - 50}" text-anchor="middle" font-family="Arial" font-size="18" fill="#F5F5DC" opacity="0.7">
        Screenshot Placeholder • ${width}x${height}
      </text>
    </svg>
  `);
  
  await sharp(svg)
    .png()
    .toFile(path.join(screenshotsDir, filename));
  
  console.log(`✅ Created: ${filename}`);
}

async function main() {
  console.log('📱 Creating screenshot placeholders...\n');
  
  const screenshots = [
    { width: 1920, height: 1080, filename: 'home-desktop.png', label: 'Premium Fashion Homepage' },
    { width: 750, height: 1334, filename: 'home-mobile.png', label: 'Mobile Experience' },
    { width: 1920, height: 1080, filename: 'products-desktop.png', label: 'Product Collection' },
    { width: 750, height: 1334, filename: 'products-mobile.png', label: 'Mobile Shopping' }
  ];
  
  for (const shot of screenshots) {
    await createScreenshot(shot.width, shot.height, shot.filename, shot.label);
  }
  
  console.log('\n✅ All screenshots created!');
}

main().catch(console.error);