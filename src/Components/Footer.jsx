import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-0 fixed-bottom">
      <div className="container">
        <p className="mb-0">&copy; 2024. All rights reserved. <Link to="/about" className="footer-link">About</Link></p>
      </div>
    </footer>
  )
}

export default Footer