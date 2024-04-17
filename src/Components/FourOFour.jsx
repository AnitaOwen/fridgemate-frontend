import { Link } from "react-router-dom"

const FourOFour = () => {
  return (
    <div className="text-center mt-4">
        <img src="https://media.istockphoto.com/id/1179991026/vector/book-or-notebook-with-404-torn-out-page.jpg?s=612x612&w=0&k=20&c=ol_hva0ObuMcmt5771zR8SwVev8ncRkkKO1xk-FKFmQ=" alt="Whoops! Page can't be found." />
        <div>
            <Link to={"/fridges"}>Back to All Fridges</Link>
        </div>
    </div>
  )
}

export default FourOFour