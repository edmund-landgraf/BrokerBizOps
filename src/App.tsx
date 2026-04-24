import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import HomePage        from './pages/HomePage'
import ServicesPage    from './pages/ServicesPage'
import WhoWeServePage  from './pages/WhoWeServePage'
import WhyBrokerPage   from './pages/WhyBrokerPage'
import ProcessPage     from './pages/ProcessPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage     from './pages/ContactPage'
import PortalPage      from './pages/PortalPage'
import AdminDocsPage   from './pages/AdminDocsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clients" element={<WhoWeServePage />} />
            <Route path="/why-broker" element={<WhyBrokerPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route path="/admin/docs" element={<AdminDocsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
