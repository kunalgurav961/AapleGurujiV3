import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { text: "Home", link: "/" },
    { text: "Pujas", link: "/pujas" },
    { text: "Astrology", link: "/astrology" },
    { text: "Samagri", link: "/samagri" },
    { text: "Customers", link: "/customers" },
  ]

  const isActive = (link) => {
    if (link === "/") return location.pathname === "/"
    return location.pathname.startsWith(link)
  }

  return (
    <nav className="relative z-50 bg-[#080604]/95 backdrop-blur-xl border-b border-white/5">
      <div className="flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="Aaple Guruji"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive(item.link)
                  ? "bg-orange-300/20 text-orange-300"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate("/book")}
            className="bg-gradient-to-r from-orange-500 to-amber-400 text-black font-semibold rounded-full px-6 py-2.5 hover:scale-105 transition-transform duration-300"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080604] border-t border-white/10 px-6 py-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.link)
                  setMobileMenuOpen(false)
                }}
                className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                  isActive(item.link)
                    ? "bg-orange-300/20 text-orange-300"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.text}
              </button>
            ))}
            <button
              onClick={() => {
                navigate("/book")
                setMobileMenuOpen(false)
              }}
              className="mt-4 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-semibold rounded-full px-6 py-3"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar
