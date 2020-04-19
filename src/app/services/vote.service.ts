import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';

@Injectable({providedIn: 'root'})
export class VoteService {
  constructor(
      private readonly afs: AngularFirestore,
  ) {}

  upvote(retroId: string, commentsIndex: number, commentId: string):
      Promise<void> {
    return this.vote(retroId, commentsIndex, commentId, 1);
  }

  downvote(retroId: string, commentsIndex: number, commentId: string):
      Promise<void> {
    return this.vote(retroId, commentsIndex, commentId, -1);
  }

  private async vote(
      retroId: string, commentsIndex: number, commentId: string,
      increment: number): Promise<void> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection(`comments-${commentsIndex}`)
        .doc(commentId)
        .update({votes: firestore.FieldValue.increment(increment)});
  }
}