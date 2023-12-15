// Supabase Step 04.03.01 :: update :: import useParams :: to get id 
import { useParams } from "react-router-dom"

// Supabase Step 04.04.01 :: Get Single record 
// :: import useState and useEffect
import { useEffect, useState } from "react";

// Supabase Step 04.05 :: Get Single record 
// import supabase
import supabase from "../supabase/sbClient";

// Supabase Step 04.06.02.1 :: Get Single record :: import navigate
import { useNavigate } from "react-router-dom";

const Update = () => {

  // Supabase Step 04.06.02.2 :: Get Single record :: import navigate
  const navigate = useNavigate();

  // Supabase Step 04.03.02 :: Get Single record :: import useParams 
  // :: to get id 
  const { id } = useParams();


  // Supabase Step 04.04.02 :: Get Single record 
  // Define useState variables ::
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');

  // Supabase Step 05.03.01 :: Update the data :: formError
  const [formError, setFormError] = useState(null);


  
  // Supabase Step 05.02 :: Update the data :: async function
  const handleSubmit = async (e) => {

    // ---------------------------------------------------
    // Supabase Step 05.02.01 :: Prevent Reloading the page...

    e.preventDefault();

    // When user submits the form, the default action is :: "the page will reload, We don't want to reload the page...

    // So, e.preventDefault() will Prevent this default action..."
    // ---------------------------------------------------



    // ------------------------------------------------------
    // Supabase Step 05.03.02 :: Update the data :: Check if anything missing...

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

    console.log(` title :: ${title}, method :: ${method}, rating :: ${rating} `);

    // So, Display title, method, rating (in Browser console) :: 
    // --------------------------------------------------------



    // --------------------------------------------------------
    // Supabase Step 05.04.01 :: Send data to supabase server...
    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, method, rating })
      .eq('id', id)
      .select()

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }

    if (data) {
      console.log(data);
      setFormError(null);
      // Supabase Step 05.04.02 :: Navigate to Home page ::
      // To see Created data...
      navigate('/');
    }
    // --------------------------------------------------------

  }

  // Supabase Step 04.04.02 :: Get Single record 
  // Define useEffect function
  useEffect(() => {

    // Supabase Step 04.05 :: Get Single record 
    // Define async function to get the data
    const fetchSmoothie = async () => {

      // Supabase Step 04.06.01 :: Get Single record 
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      // .eq => Condition
      // if row (record)'s "id" column value is = this page url "id" , then give that row...
      // It will give Array of Objects...[ {} ]

      // .single()
      // give only one row which setisfy .eq condition...
      // It will give Only one Objects... {}


      // Supabase Step 04.06.02 :: Get Single record 
      // if that record not found , then Navigate back to Homepage...
      if (error) {

      }
      // replace: true :: Don't Remember this navigation to histry


      // Supabase Step 04.06.03 :: Get Single record 
      // if data found then update useState variables...
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);

        console.log(data);
      }

    }

    fetchSmoothie();

  }, [id, navigate])

  return (
    <div className="page update">
      <h2> {`${id} ${title}`} </h2>

      {/* Supabase Step 05.01.03 :: Update the data :: 
        :: When user submit the form, run handleSubmit function */}
      <form className="" onSubmit={handleSubmit}>

        {/* --------------------------------------------- */}
        {/* Supabase Step 05.01.01 :: Update the data :: */}
        {/* label and  input :: Let user input the data first */}
        
        <div className="user-input">
          {/*  label.htmlFor = input.id */}
          <label htmlFor="title">Title:</label>

          <input type="text" id="title" value={title}
            // :: title :: display useState variable value:: 
            onChange={(e) => setTitle(e.target.value)}
          // Update the title value , when user types anything...
          />
        </div>


        {/* --------------------------------------------- */}


        {/* --------------------------------------------- */}
        {/* Supabase Step 05.01.01 :: Update the data :: Repeate */}
        <div className="user-input">
          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>

        {/* --------------------------------------------- */}


        {/* --------------------------------------------- */}
        {/* Supabase Step 05.01.01 :: Update the data :: Repeate */}
        <div className="user-input">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        {/* --------------------------------------------- */}

        {/* Supabase Step 05.01.02 :: Update the data :: Update Btn */}
        <button type="submit">
          Update Smoothie Recipe
        </button>

        {formError && <p className="error">{formError}</p>}

        {/* Supabase Step 05.03.03 :: Show Error */}
        {/* if {handleSubmit} function show Error 
                (title or method or rating is misssing),
            Then Display the error...  */}

      </form>

    </div>
  )
}

export default Update