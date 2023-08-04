import PropTypes from "prop-types";
import UpdateProfile from "./UpdateProfile.jsx";
import { useState } from "react";

const HeaderProfile = ({ firstName, lastName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName} !
      </h1>
      <button onClick={handleEditButtonClick} className="edit-button">
        Edit Name
      </button>
      {isEditing && <UpdateProfile />}
    </div>
  );
};

HeaderProfile.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default HeaderProfile;
