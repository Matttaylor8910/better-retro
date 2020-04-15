import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment, CommentCollection} from 'types';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class CommentService {
  constructor(
      private readonly afs: AngularFirestore,
      private readonly userService: UserService,
  ) {}

  async addComment(
      retroId: string, collection: CommentCollection,
      comment: Partial<Comment>): Promise<DocumentReference> {
    comment.timestamp = firestore.FieldValue.serverTimestamp();
    comment.owner = await this.userService.getOwner();
    return this.afs.collection('retrospectives')
        .doc(retroId)
        .collection(collection)
        .add(comment);
  }

  updateComment(
      retroId: string, collection: CommentCollection,
      comment: Comment): Promise<void> {
    return this.afs.collection('retrospectives')
        .doc(retroId)
        .collection(collection)
        .doc(comment.id)
        .update(comment);
  }

  deleteComment(
      retroId: string, collection: CommentCollection,
      comment: Comment): Promise<void> {
    return this.afs.collection('retrospectives')
        .doc(retroId)
        .collection(collection)
        .doc(comment.id)
        .delete();
  }

  getComments(retroId: string): Observable<Comment[]> {
    return this.afs.collection('retrospectives')
        .doc(retroId)
        .collection('thegood', ref => ref.orderBy('timestamp'))
        .snapshotChanges()
        .pipe(map(actions => {return actions.map(action => {
                    const data = action.payload.doc.data() as Comment;
                    const id = action.payload.doc.id;
                    return {id, ...data};
                  })}))
  }
}
