import { BrowserRouter, Routes, Route } from "react-router-dom"
import ContactUs from "./pages/ContactUs"

 export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  
    
      
  )
}




