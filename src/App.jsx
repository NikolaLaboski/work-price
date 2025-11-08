// src/App.jsx
import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Pricing from './pages/Pricing.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

const INSTAGRAM_URL = "https://www.instagram.com/weblab.mk93/" 

const App = () => {
  return (
    <div>
      <header>
        <nav className="container">
          <a
            className="brand"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            title="Отвори Instagram"
          >
            Instagram
          </a>
          <div className="nav-links">
            <NavLink to="/" end className={({isActive})=> 'nav-link'+(isActive?' active':'')}>Ценовник</NavLink>
            <NavLink to="/about" className={({isActive})=> 'nav-link'+(isActive?' active':'')}>За мене</NavLink>
            <NavLink to="/contact" className={({isActive})=> 'nav-link'+(isActive?' active':'')}>Контакт</NavLink>
          </div>
        </nav>
      </header>

      <main className="container">
        <div className="border-page">
          <Routes>
            <Route path="/" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      <footer className="container">
        © {new Date().getFullYear()} • Изработено со React
      </footer>
    </div>
  )
}

export default App
