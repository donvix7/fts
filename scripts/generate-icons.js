const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const sourceIcon = path.join(__dirname, '../public/icon.png') // Your main logo

async function generateIcons() {
  try {
    // Check if source icon exists
    try {
      await fs.access(sourceIcon)
    } catch {
      console.error('Source icon not found at:', sourceIcon)
      console.log('Creating a placeholder icon...')
      
      // Create a simple placeholder icon
      const placeholder = sharp({
        create: {
          width: 512,
          height: 512,
          channels: 4,
          background: { r: 212, g: 175, b: 55, alpha: 1 } // Gold color
        }
      })
      .composite([
        {
          input: Buffer.from(`
            <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
              <rect width="512" height="512" fill="#D4AF37"/>
              <text x="256" y="256" font-family="Arial" font-size="120" 
                    font-weight="bold" text-anchor="middle" fill="#4A2C2A" dy=".3em">A</text>
            </svg>
          `),
          top: 0,
          left: 0
        }
      ])
      
      await placeholder.toFile(sourceIcon)
      console.log('Created placeholder icon')
    }

    // Generate icons for each size
    for (const size of sizes) {
      const outputPath = path.join(__dirname, `../public/icons/icon-${size}x${size}.png`)
      
      await sharp(sourceIcon)
        .resize(size, size)
        .png()
        .toFile(outputPath)
      
      console.log(`Generated ${size}x${size} icon`)
    }

    // Generate maskable icon
    const maskableIcon = path.join(__dirname, '../public/icons/maskable-icon.png')
    await sharp(sourceIcon)
      .resize(512, 512)
      .extend({
        top: 64,
        bottom: 64,
        left: 64,
        right: 64,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(maskableIcon)

    console.log('Generated maskable icon')
    console.log('✅ Icons generated successfully!')

  } catch (error) {
    console.error('Error generating icons:', error)
  }
}

generateIcons()