// /users/{user}
export interface User {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

// /retrospectives/{retro}
export interface Retro {
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
  votes: number;
}

export interface Player {
  userId: string;
  name: string;
}

// /restrospectives/{retro}/players/{userId}
export interface PlayerStatus extends Player {
  done: boolean;
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