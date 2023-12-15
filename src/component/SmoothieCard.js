import React from 'react'

// Supabase Step 04.01.01 :: Edit button :: import link 
import { Link } from 'react-router-dom'
import supabase from '../supabase/sbClient'


// Import {smoothie} from Parent
const SmoothieCard = ({ smoothie, onDelete }) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)
            .select()

        if (error) {
            console.log(error)
        }
        
        if (data) {
            console.log(`Deleted item :: ${smoothie.id}`)
            console.log(data);

            // 
            onDelete(smoothie.id);
        }
    }


    return (
        <div className="smoothie-card">
            {/* Display  title, method , rating of Smoothie*/}
            <h3>{smoothie.id}</h3>
            <p>{smoothie.created_at}</p>
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>

            {/* Supabase Step 04.01.02 :: Edit button ::
            :: to navigate to the url */}
            <Link to={`/${smoothie.id}`}>
                Edit Button
            </Link>

            <button onClick={handleDelete}> delete Record </button>

        </div>
    )
}

export default SmoothieCard