import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import phoneBookActions from '../../redux/phoneBook/actions';

function Filter({ value, onChangeFilter }) {
  return (
    <div>
            <p>Find contacts by name</p>
            <input type="text" placeholder="Enter contact name" name="filter"
            value={value} onChange={onChangeFilter}/>
</div>
  );
}
const mapStateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChangeFilter: event =>
    dispatch(phoneBookActions.changeFilter(event.currentTarget.value)),
});

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);