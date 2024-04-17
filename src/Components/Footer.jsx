import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-0 fixed-bottom">
      <div className="container">
        <p className="mb-0"><span className="footer-logo">FridgeM8</span> &copy; 2024. <Link to="/about" className="footer-link">About</Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer