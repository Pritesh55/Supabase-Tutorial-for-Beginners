// Supabase Step 01.02.01 :: 
// Install supabase => npm install @supabase/supabase-js;

// Supabase Step 01.02.02 :: Create Client and Export it
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;