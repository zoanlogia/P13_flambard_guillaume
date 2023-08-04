import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updateProfile } from '../../tools/FetchApi.js';

const UpdateProfile = () => {
  const token = useSelector((state) => state.auth.token);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateProfile(token, firstName, lastName);

      if (response.status === 200) {
        // Mise à jour réussie
        alert('Mise à jour du profil réussie!');
      } else {
        // La mise à jour a échoué
        alert('La mise à jour du profil a échoué!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prénom :
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Nom de famille :
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <input type="submit" value="Mettre à jour" />
    </form>
  );
};

export default UpdateProfile;
