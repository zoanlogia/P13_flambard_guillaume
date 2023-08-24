import PropTypes from 'prop-types';

const NameEdit = (props) => {
  const { firstName, lastName, handleSubmit, close } = props;

  return (
    <form id="edit" className="form-wrapper" onSubmit={handleSubmit}>
      <div className="input-wrapper">
      <input placeholder={firstName} type="text" />
      <input placeholder={lastName} type="text" />
      </div>
      <div className="button-wrapper">
        <button className="purple-button" type="submit">Save</button>
        <button className="purple-button" onClick={close}>Cancel</button>
      </div>
    </form>
  );
};

NameEdit.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default NameEdit;
