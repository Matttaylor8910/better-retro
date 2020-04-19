import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from 'types';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class CommentService {
  constructor(
      private readonly afs: AngularFirestore,
      private readonly userService: UserService,
  ) {}

  async addComment(
      retroId: string, commentsIndex: number,
      comment: Partial<Comment>): Promise<DocumentReference> {
    comment.timestamp = firestore.FieldValue.serverTimestamp();
    comment.owner = await this.userService.getOwner();
    comment.votes = 0;
    return this.afs.collection('retros')
        .doc(retroId)
        .collection(this.getCommentsCollection(commentsIndex))
        .add(comment);
  }

  updateComment(retroId: string, commentsIndex: number, comment: Comment):
      Promise<void> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection(this.getCommentsCollection(commentsIndex))
        .doc(comment.id)
        .update(comment);
  }

  deleteComment(retroId: string, commentsIndex: number, commentId: string):
      Promise<void> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection(this.getCommentsCollection(commentsIndex))
        .doc(commentId)
        .delete();
  }

  getComments(retroId: string, commentsIndex: number): Observable<Comment[]> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection(
            this.getCommentsCollection(commentsIndex),
            ref => ref.orderBy('timestamp'))
        .snapshotChanges()
        .pipe(map(actions => {return actions.map(action => {
                    const data = action.payload.doc.data() as Comment;
                    const id = action.payload.doc.id;
                    return {id, ...data};
                  })}))
  }

  private getCommentsCollection(index: number) {
    return `comments-${index}`;
  }
}
