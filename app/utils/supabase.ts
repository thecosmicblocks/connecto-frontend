import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string, process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string)

async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
    })
    return { data, error }
}

export { signInWithDiscord }
export default supabase