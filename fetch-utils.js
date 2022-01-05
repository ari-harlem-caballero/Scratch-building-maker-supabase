const SUPABASE_URL = 'https://tfmffhhouzltgbgztitj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMzNzQ1NywiZXhwIjoxOTU2OTEzNDU3fQ.vHMFwHEItZAfZYwxyc9qtPFl1t7k7wtBTYhNj76bH84';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

//new name, new message, default city
//old user: get city
export async function getTown() {
    const response = await client
        .from('builder')
        .select()
        .single();
    
    return checkError(response);
}

export async function getDefaultTown() {
    const response = await client
        .from('builder')
        .insert([
            {
                name: 'Arcadia',
                land: 1,
                castle: 1,
                creature: 1,
                message: []
            }
        ]);
    
    return checkError(response);
}

export async function updateName(newName) {
    const user = await getUser();
    
    const response = await client
        .from('builder')
        .update({ name : newName })
        .match({ user_id: user.user.id })
        .single();
    
    return checkError(response);
}
//castle, land, creature, message update
export async function updateLand(newId) {
    const user = await getUser();

    const response = await client
        .from('builder')
        .update({ land: newId })
        .match({ user_id: user.user.id })
        .single();
    
    return checkError(response);
}




export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./builder');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
