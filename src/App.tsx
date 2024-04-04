import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import Navbar from './components/Navbar';

function App(): JSX.Element {
  return (
    <>

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
