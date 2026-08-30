import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home, About, Skills, Experience, Projects, Education, Contact } from "./pages";
import "./index.css";

function App() {
  return (
    <Router>
      {/* Background ambient blobs */}
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/*"
          element={
            <>
              <div style={{ paddingTop: "80px", minHeight: "calc(100vh - 160px)" }}>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
