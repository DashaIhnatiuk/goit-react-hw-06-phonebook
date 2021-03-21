import PropTypes from "prop-types";
import style from "./OutputSection.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import slideTransition from "../Animations/slide.module.css";
import phoneBookActions from "../../redux/phoneBook/actions";
import { connect } from "react-redux";

function OutputSection({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup component="ul" className={style.ulSection}>
      {contacts.map(({ id, name, number }) => {
        return (
          <CSSTransition
            key={id}
            timeout={250}
            classNames={slideTransition}
            unmountOnExit
          >
            <li className={style.liItem} key={id}>
              {name} : {number}
              <button
                className={style.deleteBtn}
                onClick={() => {
                  onDeleteContact(id);
                }}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

const getFilteredContacts = (allContacts, filter) => {
  return allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};
const mapStateToProps = ({ contacts: { items, filter } }) => {
  return {
    contacts: getFilteredContacts(items, filter),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteContact: (id) => dispatch(phoneBookActions.deleteContact(id)),
});
OutputSection.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(OutputSection);