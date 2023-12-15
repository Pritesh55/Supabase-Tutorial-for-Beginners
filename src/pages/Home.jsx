// Supabase Step 01.03 :: import supabase Client... 
import SmoothieCard from "../component/SmoothieCard";
import supabase from "../supabase/sbClient"

// Supabase Step 02.01 :: Use the data :: import useEffect and useState
// https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
// Section 04 :: Query data from the app 
import { useEffect, useState } from "react";

const Home = () => {
  // Supabase Step 01.04 :: Console.log :: supabase object
  console.log(supabase);

  // Supabase Step 02.02 :: Use the data :: Define useState variables ::
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  // Supabase Step 02.03 :: Use the data :: Define useEffect function
  useEffect(() => {
    // Create new async function
    const fetchSmoothies = async () => {

      // store data in the new data variable...
      // supabase is the :: array of objects :: Each object is Row of data :: which is called Record 
      // .from ("Table_Name")
      // .select("All rows")
      const { data, error } = await supabase
        .from("smoothies")
        .select();

      // .from() => table name :: from which table data you want
      // .select() => No arguments :: We want all rows...

      if (error) {
        setFetchError('Could not fetch the smoothies');
        setSmoothies(null);
        console.log('Oh..Error to fetch Table :: Smoothies');
        console.log(fetchError);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
        console.log('success , got the smoothies...');
        console.log(data);
      }

    }

    fetchSmoothies();
  }, []);


  return (
    <div className="page home">
      <h2>Home</h2>

      {/* Display the error */}
      {
        fetchError && (<p>{fetchError}</p>)
      }

      {/* Display the data */}
      {
        smoothies && (

          <div className="smoothies">
            {/* order-by buttons */}
            <div className="smoothie-grid">

              {/* ------------------------------------------- */}
              {/* Move data (Smoothie) to Child component :: */}

              {smoothies.map(smoothie => (
                <SmoothieCard key={smoothie.id} smoothie={smoothie} />
              ))}

              {/* ------------------------------------------- */}

            </div>
          </div>
        )
      }

    </div>
  )
}

export default Home