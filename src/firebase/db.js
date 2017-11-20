import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

// Reading API

export const doCreateReading = (authUser, story) =>
  db.ref(`users/${authUser.uid}/readings`).push(story);

export const onceGetReadings = (authUser) =>
  db.ref(`users/${authUser.uid}/readings`).once('value');
