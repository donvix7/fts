const fs = require('fs').promises;
const path = require('path');

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🔍 Verifying PWA Manifest Requirements...\n');
  
  const publicDir = path.join(__dirname, '../public');
  const manifestPath = path.join(publicDir, 'manifest.json');
  
  // Check manifest exists
  if (!await checkFileExists(manifestPath)) {
    console.error('❌ manifest.json not found!');
    return;
  }
  
  console.log('✅ manifest.json found');
  
  // Read and parse manifest
  const manifestContent = await fs.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestContent);
  
  // Check required fields
  const requiredFields = ['name', 'short_name', 'description', 'theme_color', 'background_color', 'icons'];
  for (const field of requiredFields) {
    if (!manifest[field]) {
      console.error(`❌ Missing required field: ${field}`);
    } else {
      console.log(`✅ Has required field: ${field}`);
    }
  }
  
  // Check icons
  console.log('\n📁 Checking icons...');
  const iconsDir = path.join(publicDir, 'icons');
  
  const requiredIcons = [
    'icon-72x72.png',
    'icon-96x96.png',
    'icon-128x128.png',
    'icon-144x144.png',
    'icon-152x152.png',
    'icon-192x192.png',
    'icon-256x256.png',
    'icon-384x384.png',
    'icon-512x512.png'
  ];
  
  for (const icon of requiredIcons) {
    const iconPath = path.join(iconsDir, icon);
    if (await checkFileExists(iconPath)) {
      console.log(`✅ ${icon}`);
    } else {
      console.error(`❌ Missing: ${icon}`);
    }
  }
  
  // Check shortcut icons if they exist in manifest
  if (manifest.shortcuts) {
    console.log('\n🔗 Checking shortcut icons...');
    for (const shortcut of manifest.shortcuts) {
      if (shortcut.icons && shortcut.icons[0]) {
        const iconName = shortcut.icons[0].src.split('/').pop();
        const iconPath = path.join(publicDir, shortcut.icons[0].src);
        if (await checkFileExists(iconPath)) {
          console.log(`✅ ${iconName}`);
        } else {
          console.error(`❌ Missing shortcut icon: ${iconName}`);
        }
      }
    }
  }
  
  console.log('\n✅ Verification complete!');
  console.log('\n💡 If you see missing files, run:');
  console.log('   npm run generate-icons');
  console.log('   npm run generate-screenshots');
}

main().catch(console.error);