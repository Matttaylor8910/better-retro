// /users/{user}
export interface User {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

export interface Owner {
  userId: string;
  name: string;
}

// /retrospectives/{retro}
export interface Retrospective {
  id: string;
  name: string;
  owner: Owner;
  state: RETRO_STATE;
  timestamp: firebase.firestore.FieldValue;
}

// /restrospectives/{retro}/thegood/{comment}
// /restrospectives/{retro}/thebad/{comment}
export interface Comment {
  text: string;
  owner: Owner;
  timestamp: firebase.firestore.FieldValue;
}

// /restrospectives/{retro}/thegood/{comment}/votes/{vote}
// /restrospectives/{retro}/thebad/{comment}/votes/{vote}
export interface Vote {
  // If you call votesRef.doc(userId).set({count:
  // firestore.FieldValue.increment(1) }) then count will be created or
  // incremented by 1. This is useful for the same user voting on a comment more
  // than one time
  count: number;
  timestamp: firebase.firestore.FieldValue;
}

export enum RETRO_STATE {
  NOTES = 'Notes',
  DISCUSSION = 'Discussion',
  VOTING = 'Voting',
  FINISHED = 'Finished',
}