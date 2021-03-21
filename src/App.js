import AddSection from "./components/AddSection";
import OutputSection from "./components/OutputSection";
import Filter from "./components/Filter";
import { CSSTransition } from "react-transition-group";
import titleTransition from "./components/Animations/title.module.css";
import popTransition from "./components/Animations/pop.module.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";

function App({ contacts }) {
  return (
    <div className="container">
      <CSSTransition in timeout={500} classNames={titleTransition} appear>
        <h1 className="title">Phonebook</h1>
      </CSSTransition>
      <AddSection />

      <CSSTransition
        in={contacts.length > 1}
        timeout={250}
        classNames={popTransition}
        unmountOnExit
      >
        <Filter />
      </CSSTransition>

      <CSSTransition
        in={contacts.length > 0}
        timeout={250}
        classNames={popTransition}
        unmountOnExit
      >
        <div>
          <h2 className="title">Contacts</h2>

          <OutputSection />
        </div>
      </CSSTransition>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
});

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default connect(mapStateToProps, null)(App);
