// /users/{user}
export interface User {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

// /retrospectives/{retro}
export interface orderBy
(comments, 'owner.name') {
  id: string;
  name: string;
  owner: Player;
  state: RETRO_STATE;
  timestamp: firebase.firestore.FieldValue;
}

// /restrospectives/{retro}/thegood/{comment}
// /restrospectives/{retro}/thebad/{comment}
export interface Comment {
  id: string;
  text: string;
  owner: Player;
  timestamp: firebase.firestore.FieldValue;
}

export interface Player {
  userId: string;
  name: string;
}

// /restrospectives/{retro}/players/{userId}
export interface PlayerStatus extends Player {
  done: boolean;
}

// /restrospectives/{retro}/thegood/{comment}/votes/{userId}
// /restrospectives/{retro}/thebad/{comment}/votes/{userId}
export interface Vote {
  // If you call votesRef.doc(userId).set({count:
  // firestore.FieldValue.increment(1) }) then count will be created or
  // incremented by 1. This is useful for the same user voting on a comment more
  // than one time
  count: number;
  timestamp: firebase.firestore.FieldValue;
}

export enum CommentCollection {
  THE_GOOD = 'thegood',
  THE_BAD = 'thebad',
}

export enum RETRO_STATE {
  NOTES = 'Notes',
  DISCUSSION = 'Discussion',
  VOTING = 'Voting',
  FINISHED = 'Finished',
}