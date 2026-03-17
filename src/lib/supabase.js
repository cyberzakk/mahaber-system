import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://axakzdlccwslvqibvbnn.supabase.co"
const supabaseKey = "sb_publishable_-7zNpOtmW2egbXiaokIEgA_1X1HFIff"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)