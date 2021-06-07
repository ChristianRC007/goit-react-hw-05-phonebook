import React, { Component } from 'react';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { v4 as uuid } from 'uuid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isExist: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    if (this.state.isExist !== prevState.isExist) {
      const timer = setTimeout(() => {
        this.setState({ isExist: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }

  addContact = ({ name, number }) => {
    const contact = { id: uuid(), name, number };

    if (this.state.contacts.find(contact => contact.name === name)) {
      this.setState({ isExist: true });
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    const normalizedContact = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedContact),
    );

    return (
      <Container>
        <h1 className="title">Phonebook</h1>
        <Notification isExist={this.state.isExist} />

        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>

        <Filter
          value={filter}
          onChange={this.changeFilter}
          isAppeared={this.state.contacts.length > 1}
        />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
