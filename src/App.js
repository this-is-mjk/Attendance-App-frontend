import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebcamCapture from './components/webcam';
import Home from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webcam" element={<WebcamCapture />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
