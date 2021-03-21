import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './AddSection.module.css';
import notificationTransition from "../Animations/alert.module.css";
import Notification from "../Notification";
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import phoneBookActions from '../../redux/phoneBook/actions';

class AddSection extends Component {
  state = {
    name: '',
    number: '',
    error: false,
    errorMessage: '',
  };


  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contacts = this.props.contacts;

    if(!name){
      this.setState({
        error: true,
        errorMessage: 'Enter name please',
      });
      setTimeout(() => {
        this.setState({ error: false });
      }, 3000);
      return;
    }

    if(!number){
      this.setState({
        error: true,
        errorMessage: 'Enter number please',
      });
      setTimeout(() => {
        this.setState({ error: false });
      }, 3000);
      return;
    }

    if (contacts.some(contact => contact.name === name)) {
      this.setState({
        error: true,
        errorMessage: 'Contact already exists',
      });
      setTimeout(() => {
        this.setState({ error: false });
      }, 3000);
      this.resetData();
      return;
    }

    this.props.onAddContact(name, number);
    this.resetData();
  };
  resetData() {
    this.setState({ name: '', number: '' });
  }
    render() {
      const { name, number, errorMessage } = this.state;
  
      return (
        <div className={s.container}>
            <p>Name</p>
            <input type="text" placeholder="Enter contact name" name="name"
              value={name} onChange={this.handleInput}/>
            <p>Number</p>
            <input type="text" placeholder="Enter phone number" name="number"
              value={number} onChange={this.handleInput}/>
            <button className={s.addBtn} onClick={this.handleSubmit}>Add contact</button>

            <CSSTransition
          in={this.state.error}
          timeout={250}
          classNames={notificationTransition}
          unmountOnExit
        >
          <Notification message={errorMessage} />
        </CSSTransition>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    contacts: state.contacts.items,
  });
  
  const mapDispatchToProps = dispatch => ({
    onAddContact: (name, number) =>
      dispatch(phoneBookActions.addContact(name, number)),
  });

  AddSection.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ),
    onAddContact: PropTypes.func.isRequired,
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddSection);