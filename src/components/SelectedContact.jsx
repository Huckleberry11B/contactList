import React, { useState, useEffect } from "react";

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://jsonplace-univclone.herokuapp.com/users/${selectedContactId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data = await response.json();
        console.log("Fetched contact:", data);
        setContact(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);

  return (
    <div>
      <h2>Contact Details</h2>
      {contact ? (
        <div>
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>
      ) : (
        <p>Loading contact...</p>
      )}
      <button onClick={() => setSelectedContactId(null)}>Back to List</button>
    </div>
  );
}
