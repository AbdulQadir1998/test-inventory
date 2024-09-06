const levenshtein = require('fast-levenshtein');

const normalizeName = (name) => {
    return name
        .toLowerCase()             
        .replace(/[^\w\s]/g, '')        
        .split(/\s+/)                  
        .filter(Boolean);            
}

// Helper function to calculate similarity between two token arrays using Levenshtein distance
const calculateTokenSimilarity = (tokens1, tokens2) => {
    const totalTokens = Math.max(tokens1.length, tokens2.length);
    let commonTokens = 0;

    tokens1.forEach(token1 => {
        tokens2.forEach(token2 => {
            const distance = levenshtein.get(token1, token2);
            if (distance <= Math.min(token1.length, token2.length) / 3) {
                commonTokens++;
            }
        });
    });

    return commonTokens / totalTokens;
}

// Function to group similar products
const groupProducts = (products) => {
  const groups = [];

  products.forEach(product => {
      const normalizedProduct = normalizeName(product);
      let foundGroup = false;

      for (let group of groups) {
          const normalizedGroup = group.map(normalizeName);
          if (calculateTokenSimilarity(normalizedProduct, normalizedGroup[0]) > 0.6) {
              group.push(product);
              foundGroup = true;
              break;
          }
      }

      if (!foundGroup) {
          groups.push([product]);
      }
  });

  return groups;
}


// Test-cases
const testCases = {
  products1: [
    "Apple iPhone 13",
    "iPhone 13 Apple",
    "iPhone 13 by Apple",
    "Apple iPhone XIII",
  ],
  products2: [
    "Samsung Galaxy S21",
    "Samsung Galaxy S-21",
    "Galaxy S21 by Samsung",
    "Samsung Galaxy S21 Ultra",
  ],
  products3: [
    "Apple iPhone 13",
    "Apple iPhone 12",
    "Samsung Galaxy S21",
    "Samsung Galaxy S21 Plus",
    "Google Pixel 6"
  ],
  products4: [
    "Apple iPhone 13 128GB",
    "Apple iPhone 13 256GB",
    "iPhone 13 by Apple",
    "iPhone 12 128GB",
    "Samsung Galaxy S21 5G"
  ],
  products5: [
    "Samsung Galaxy S21",
    "Samsung Galaxy S21 Ultra",
    "Samsung Galaxy S21 Plus",
    "Apple iPhone 13",
    "Apple iPhone 13 Pro Max"
  ]
};

for (const [key, products] of Object.entries(testCases)) {
  const groupedProducts = groupProducts(products);
  console.log(`Test Case: ${key}`);
  console.log(groupedProducts);
  console.log('===================================');
}
