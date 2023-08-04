const urlAPI = "http://localhost:3001/api/v1"

export const login = async (email, password) => {
  const endpoint = "/user/login";
  const url = urlAPI + endpoint;
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

    // No need to save token here since we are doing it in loginUser thunk
    // localStorage.setItem('token', data.body.token)

    return data
      
  } catch (error) {
    console.log(error)
    return {error: error.toString()}
  }
}

export const getProfile = async (token) => {
  const endpoint = "/user/profile";
  const url = urlAPI + endpoint;
  const options = {
    method: 'POST', // devrait être un GET mais bon...
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error ('fetch pas OK')

    const data = await response.json()
    console.log(data);

    return data
      
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateProfile = async (firstName, lastName, token) => {
  const url = `${urlAPI}/user/profile`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const updateUser = async (user, token) => {
  const endpoint = "/user/update";
  const url = urlAPI + endpoint;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error ('fetch pas OK')

    const data = await response.json()

    return data
      
  } catch (error) {
    console.error(error)
    throw error
  }
}
