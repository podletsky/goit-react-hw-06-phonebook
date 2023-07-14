import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  updateFilter,
} from '../redux/contactsSlice/conactsSlice';

import { persistor } from '../redux/store/configureStore';
import ContactForm from '../components/сontactForm/ContactForm';
import ContactList from '../components/contactList/ContactList';
import Filter from '../components/filter/Filter';
import styles from '../components/contactList/ContactList.module.css';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    persistor.flush();
  }, [contacts]);

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };
  const handleAddContact = contact => {
    try {
      dispatch(addContact(contact));
    } catch (error) {
      const errorMessage = error.toString();
      console.log(errorMessage);
    }
  };

  const handleFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={styles.app}>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={handleDelete}
      />
    </div>
  );
};

export { App };
