require('dotenv').config();
const { generateProductData } = require('./aiGenerator');

async function test() {
  try {
    const data = await generateProductData('Poco M8');
    console.log(data);
  } catch (error) {
    console.error('Test Failed:', error);
  }
}

test();
