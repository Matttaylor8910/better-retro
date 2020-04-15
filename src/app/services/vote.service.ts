import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {CommentCollection} from 'types';

import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class VoteService {
  constructor(
      private readonly afs: AngularFirestore,
      private readonly userService: UserService,
  ) {}

  upvote(
      retroId: string, commentCollection: CommentCollection,
      commentId: string): Promise<void> {
    return this.vote(retroId, commentCollection, commentId, 1);
  }

  downvote(
      retroId: string, commentCollection: CommentCollection,
      commentId: string): Promise<void> {
    return this.vote(retroId, commentCollection, commentId, -1);
  }

  private async vote(
      retroId: string, commentCollection: CommentCollection, commentId: string,
      increment: number): Promise<void> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection(commentCollection)
        .doc(commentId)
        .update({votes: firestore.FieldValue.increment(increment)})
  }
}