import { Link } from "react-router-dom"

const FourOFour = () => {
  return (
    <div className="text-center mt-4">
        <img src="https://res.cloudinary.com/dveesfude/image/upload/v1713363165/book-or-notebook-with-404-torn-out-page_ph6h7j.jpg" alt="Whoops! Page can't be found." />
        <div>
            <Link to={"/fridges"}>Back to All Fridges</Link>
        </div>
    </div>
  )
}

export default FourOFour