// Supabase Step 03.01 :: Create the data :: import useState
import { useState } from "react"
import supabase from "../supabase/sbClient";

// Supabase Step 03.07.01 :: Navigate to Home page :: import
import { useNavigate } from "react-router-dom"


const Create = () => {
  // Supabase Step 03.07.01 :: Navigate to Home page :: intialize
  const navigate = useNavigate();


  // Supabase Step 03.02 :: Create the data :: Define useState variables
  // title, method , rating
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');


  const [formError, setFormError] = useState(null);


  const handleSubmit = async (e) => {

    // ---------------------------------------------------
    // Supabase Step 03.03.03 :: Prevent Reloading the page...

    e.preventDefault();

    // When user submits the form, the default action is :: "the page will reload, We don't want to reload the page...

    // So, e.preventDefault() will Prevent this default action..."
    // ---------------------------------------------------



    // ------------------------------------------------------
    // Supabase Step 03.03.04 :: Check if anything missing...

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    // if title or method or rating is misssing, ?
    // then don't send data to server....and show error...
    // then, return immediately..
    // --------------------------------------------------------



    // --------------------------------------------------------
    // So, From here, It is confirm that, All values are filled by user

    console.log(` title :: ${title}, method :: ${method}, rating :: ${rating} `)

    // So, Display title, method, rating (in Browser console) :: 
    // --------------------------------------------------------



    // --------------------------------------------------------
    // Supabase Step 03.03.06 :: Send data to supabase server...
    const { data, error } = await supabase
      .from('smoothies')
      .insert([ { title, method, rating } ])
      .select()

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }

    if (data) {
      console.log(data);
      setFormError(null);
      // Supabase Step 03.07.01 :: Navigate to Home page ::
      // To see Created data...
      navigate('/');
    }
    // --------------------------------------------------------

  }

  return (

    <div className="page create">
      <h2>Create</h2>

      {/* Supabase Step 03.03 :: Create the data ::  submit the form */}
      <form onSubmit={handleSubmit}>

        {/* Supabase Step 03.03.02 :: user submit the data...*/}
        {/* on submit button click, run  {handleSubmit} function */}


        {/* --------------------------------------------- */}
        {/* Supabase Step 03.03.01 :: Create the data :: */}
        {/* label and  input :: Let user input the data first */}

        {/*  label.htmlFor = input.id */}
        <label htmlFor="title">Title:</label>

        <input type="text" id="title" value={title}
          // :: title :: display useState variable value:: 
          onChange={(e) => setTitle(e.target.value)}
        // Update the title value , when user types anything...
        />

        {/* --------------------------------------------- */}


        {/* --------------------------------------------- */}
        {/* Supabase Step 03.03.01 :: Create the data :: Repeate */}
        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        {/* --------------------------------------------- */}


        {/* --------------------------------------------- */}
        {/* Supabase Step 03.03.01 :: Create the data :: Repeate */}
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        {/* --------------------------------------------- */}


        <button type="submit">
          Create Smoothie Recipe
        </button>



        {formError && <p className="error">{formError}</p>}

        {/* Supabase Step 03.03.05 :: Show Error */}
        {/* if {handleSubmit} function show Error 
                (title or method or rating is misssing),
            Then Display the error...  */}

      </form>
    </div>
  )
}

export default Create