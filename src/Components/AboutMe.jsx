

const AboutMe = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        {/* <img src="https://res.cloudinary.com/dveesfude/image/upload/v1713364923/AnitaMagentaphoto1_izdm06.jpg"className="card-img-top img-thumbnail photo" alt="My Image" /> */}
        <div className="card-body">
          <h1 className="card-title">About Me</h1>
          <p className="card-text">Hi there! I'm Anita Owen, the developer behind <span className="logo">FridgeM8</span>.</p>
          <p className="card-text">I'm passionate about creating awesome web applications and I'm excited to share this project with you.</p>
          <p className="card-text">Feel free to reach out if you have any questions or suggestions!</p>
          <a href="https://github.com/AnitaOwen" target="_blank" >Visit my GitHub</a>
        </div>
      </div>

    </div>
  )
}

export default AboutMe