const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Function to create a canvas with the peach emoji
function createPeachCanvas(size, fontSize) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, size, size);
  
  // Draw peach emoji
  ctx.font = `${fontSize}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🍑', size / 2, size / 2);
  
  return canvas;
}

// Sizes to generate
const sizes = [
  { name: 'icon-512.png', size: 512, fontSize: 400 },
  { name: 'icon-192.png', size: 192, fontSize: 150 },
  { name: 'apple-touch-icon.png', size: 180, fontSize: 140 },
  { name: 'favicon-32x32.png', size: 32, fontSize: 24 }
];

// Generate all favicon sizes
async function generateFavicons() {
  console.log('Generating peach emoji favicons...');
  
  // Make sure the public directory exists
  const publicDir = path.join(__dirname, '..');
  
  try {
    // Generate each size
    for (const { name, size, fontSize } of sizes) {
      console.log(`Generating ${name}...`);
      const canvas = createPeachCanvas(size, fontSize);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(path.join(publicDir, name), buffer);
    }
    
    console.log('All favicon files generated successfully!');
    console.log('NOTE: For favicon.ico, please convert favicon-32x32.png using an online converter like favicon.io');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Run the generation
generateFavicons(); 