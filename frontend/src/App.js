import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeAPI, setActiveAPI] = useState('');

  // URL untuk Laravel API dan Go API
  const LARAVEL_API = 'http://frontend.local:30801/api/products';
  const GO_API = 'http://frontend.local:30808/api/products';

  // Function untuk fetch data dari Laravel API
  const fetchLaravelData = async () => {
    setLoading(true);
    setActiveAPI('Laravel');
    try {
      const response = await fetch(LARAVEL_API, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching Laravel data:', error);
      setData({
        success: false,
        message: 'Error connecting to Laravel API',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Function untuk fetch data dari Go API
  const fetchGoData = async () => {
    setLoading(true);
    setActiveAPI('Go');
    try {
      const response = await fetch(GO_API, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching Go data:', error);
      setData({
        success: false,
        message: 'Error connecting to Go API',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Function untuk format data display
  const renderData = () => {
    if (!data) return null;

    return (
      <div className="data-container">
        <h3>Hasil dari {activeAPI} API:</h3>
        
        {data.success ? (
          <div className="success-data">
            <p><strong>Status:</strong> ✅ {data.message}</p>
            <p><strong>Total Products:</strong> {data.count || 0}</p>
            
            {data.data && data.data.length > 0 && (
              <div className="products-list">
                <h4>Daftar Produk:</h4>
                {data.data.map((product, index) => (
                  <div key={product.id || index} className="product-card">
                    <h5>{product.name}</h5>
                    <p><strong>Harga:</strong> ${product.price}</p>
                    <p><strong>Kategori:</strong> {product.category}</p>
                    <p><strong>Stok:</strong> {product.quantity}</p>
                    <p className="description">{product.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="error-data">
            <p><strong>Status:</strong> ❌ {data.message}</p>
            <p><strong>Error:</strong> {data.error}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Products API Frontend</h1>
        <p className="subtitle">
          Interface untuk mengakses Laravel API dan Go API
        </p>
        
        <div className="buttons-container">
          <button 
            className="api-button laravel-btn"
            onClick={fetchLaravelData}
            disabled={loading}
          >
            {loading && activeAPI === 'Laravel' ? (
              <span>⏳ Loading...</span>
            ) : (
              <span>🐘 Hit Laravel API</span>
            )}
          </button>
          
          <button 
            className="api-button go-btn"
            onClick={fetchGoData}
            disabled={loading}
          >
            {loading && activeAPI === 'Go' ? (
              <span>⏳ Loading...</span>
            ) : (
              <span>🐹 Hit Go API</span>
            )}
          </button>
        </div>

        <div className="api-info">
          <div className="api-endpoint">
            <strong>Laravel API:</strong> <code>{LARAVEL_API}</code>
          </div>
          <div className="api-endpoint">
            <strong>Go API:</strong> <code>{GO_API}</code>
          </div>
        </div>

        {renderData()}
      </header>
    </div>
  );
}

export default App;
