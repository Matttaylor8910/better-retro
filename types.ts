// /users/{user}
export interface User {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

// /retros/{retro}
export interface Retro {
  id: string;
  name: string;
  owner: Player;
  state: RETRO_STATE;
  commentLists: CommentList[];
  maxVotes: number;
  timestamp: firebase.firestore.FieldValue;
}

export interface CommentList {
  header: string;
  allowVoting: boolean;
}

// /restrospectives/{retro}/comments-{index}/{comment}
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

export enum RETRO_STATE {
  NOTES = 'Notes',
  DISCUSSION = 'Discussion',
  VOTING = 'Voting',
  FINISHED = 'Finished',
}