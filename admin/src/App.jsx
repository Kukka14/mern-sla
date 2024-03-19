import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDashboard from './MainDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
