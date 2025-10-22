const fetch = require('node-fetch');

async function testProductCreation() {
  try {
    // First, login to get a token
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@beldenbrick.com',
        password: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      console.error('❌ Login failed:', loginData.message);
      return;
    }

    console.log('✅ Login successful');
    const token = loginData.token;

    // Test creating a product with new fields
    const productData = {
      name: 'Test Product with New Fields',
      description: 'This is a test product to verify the new interface works correctly',
      price: 99.99,
      category: 'Bricks',
      sku: 'TEST-NEW-001',
      stock: 50,
      location: 'Quận 2, TP.HCM',
      year: 2024,
      specifications: {
        dimensions: '215mm x 102mm x 65mm',
        weight: '2.8kg/viên',
        strength: '≥ 10 MPa',
        absorption: '≤ 20%',
        color: 'Red',
        material: 'Clay',
        features: ['Chất lượng cao', 'Thân thiện môi trường', 'Dễ thi công']
      },
      isActive: true
    };

    const createResponse = await fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    const createData = await createResponse.json();
    
    if (createData.success) {
      console.log('✅ Product created successfully!');
      console.log('📦 Product ID:', createData.data.id);
      console.log('📍 Location:', createData.data.location);
      console.log('📅 Year:', createData.data.year);
      console.log('🔧 Specifications:', JSON.stringify(createData.data.specifications, null, 2));
    } else {
      console.error('❌ Product creation failed:', createData.message);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testProductCreation();
