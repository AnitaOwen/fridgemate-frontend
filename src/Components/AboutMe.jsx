import { Link } from 'react-router-dom'

const AboutMe = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        {/* <img src="https://res.cloudinary.com/dveesfude/image/upload/v1713364923/AnitaMagentaphoto1_izdm06.jpg"className="card-img-top img-thumbnail photo" alt="My Image" /> */}
        <div className="card-body">
          <h1 className="card-title">About Me</h1>
          <p className="card-text">Hi there! I'm Anita Owen, the developer behind <span className="text-logo">FridgeM8</span>.</p>
          <p className="card-text">I'm passionate about creating awesome web applications and I'm excited to share this project with you.</p>
          <p className="card-text">Feel free to reach out if you have any questions or suggestions!</p>
          <Link to="https://github.com/AnitaOwen" target="_blank">Visit my GitHub
          </Link>
        </div>
      </div>
      <div className="text-center mt-3">
          <Link to="/">
            <button className="btn btn-outline-info btn-sm m-4">Home</button>
          </Link>
          <Link to="/fridges">
            <button className="btn btn-outline-info btn-sm m-4">All Fridges</button>
          </Link>
        </div>

    </div>
  )
}

export default AboutMe