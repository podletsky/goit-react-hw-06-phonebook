import React from 'react';
import styles from '../contactList/ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selestFilter,
  selestSelectors,
} from '../../redux/selectors/selectors.js';
import { deleteContact } from 'redux/contactsSlice/conactsSlice';

const ContactList = () => {
  const contacts = useSelector(selestSelectors);
  const filter = useSelector(selestFilter);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <div className={styles.list}>
        {visibleContacts.map(contact => (
          <div key={contact.id}>
            <div className={styles.item}>
              <p className={styles.text}>
                {contact.name}: {contact.number}
              </p>
              <div>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => handleDelete(contact.id)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
