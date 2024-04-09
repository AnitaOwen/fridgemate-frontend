import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


const FridgeDetails = () => {
    const [fridge, setFridge] = useState()
    const { fridge_id } = useParams();

    useEffect(() => {
        fetch(`${URL}/api/fridges/${fridge_id}`)
          .then((res) => res.json())
          .then((data) => setFridge(data));
      }, [fridge_id]);

  return (
    <div>
        {fridge && (
            <section>
                <h3>fridge.location</h3>
                <p>fridge.notes</p>
            </section>
        )}
    </div>
  )
}

export default FridgeDetails