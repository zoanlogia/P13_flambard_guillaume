import PropTypes from 'prop-types';

const HeaderProfile = ({ firstName, lastName }) => (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName} !
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );

  HeaderProfile.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    };

  export default HeaderProfile;
  