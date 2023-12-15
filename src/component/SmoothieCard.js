import React from 'react'

// Import {smoothie} from Parent
const SmoothieCard = ({ smoothie }) => {
    return (
        <div className="smoothie-card">
            {/* Display  title, method , rating of Smoothie*/}
            <h3>{smoothie.id}</h3>
            <p>{smoothie.created_at}</p>
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
        </div>
    )
}

export default SmoothieCard