const urlAPI = "http://localhost:3001/api/v1"

export const login = async (email, password) => {
    // on construit l'url
    const endpoint = "/user/login";
    const url = urlAPI + endpoint;

    // options du fetch
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
    };
  
  try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error ('fetch pas OK')

      const data = await response.json()

      if (!data || !data.body || data.status !== 200) throw new Error (data.status.message)


      return data // Return whole response data instead of just the token
      
  } catch (error) {
      console.log(error)
      return {error: error.toString()}
  }
}

export const getProfile = async (token) => {
  // on construit l'url
  const endpoint = "/user/profile";
  const url = urlAPI + endpoint;

  // options du fetch
  const options = {
    method: 'GET', // devrait être un GET mais bon...
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error ('fetch pas OK')
    
    const data = await response.json()

    return data
      
  } catch (error) {
      console.log(error)
      throw error
  }
}

// export const deleteUser () {

// }