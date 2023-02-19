import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const postIdState = atom({
  key: 'postIdState',
  default: 'id',
});


// The below error occurs because the document ID has an empty string for the initial state.
// To fix this error we need to set the inital state to a value
//-----------------------------------------------------------------------------------------
// Unhandled Runtime Error
// FirebaseError: Invalid document reference. Document references must have an even number of segments, but posts has 1.