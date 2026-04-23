import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Services    from './components/Services'
import WhoWeServe  from './components/WhoWeServe'
import WhyBroker   from './components/WhyBroker'
import Process     from './components/Process'
import Testimonials from './components/Testimonials'
import Contact     from './components/Contact'
import Footer      from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <WhoWeServe />
      <WhyBroker />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
