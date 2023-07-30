const fetchUserData = async (userData) => {
  const url = 'http://localhost:3001/api/v1/user/signup';
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const parsedData = JSON.parse(data.data);

    console.log(parsedData);
    // handle your data here

    return parsedData;
  } catch (error) {
    console.error('Error:', error);
    // handle your error here
  }
}

export default fetchUserData;