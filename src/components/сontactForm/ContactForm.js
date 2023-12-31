import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from '../contactList/ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selestSelectors } from '../../redux/selectors/selectors.js';
import { addContact } from 'redux/contactsSlice/conactsSlice';
const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selestSelectors);
  const dispatch = useDispatch();
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleAddContact = contact => {
    try {
      dispatch(addContact(contact));
    } catch (error) {
      const errorMessage = error.toString();
      console.log(errorMessage);
    }
  };
  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(`Контакт з ім'ям ${name} вже існує!`);
    } else {
      dispatch(addContact(newContact));
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        required
      />
      <input
        className={styles.input}
        type="tel"
        name="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Phone Number"
        required
      />
      <button
        className={styles.buttonForm}
        type="submit"
        onInput={handleAddContact}
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
