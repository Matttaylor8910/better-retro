import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Player, RETRO_STATE, Retrospective} from 'types';

import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class RetroService {
  constructor(
      private readonly afs: AngularFirestore,
      private readonly userService: UserService,
  ) {}

  async createRetro(retro: Partial<Retrospective>): Promise<DocumentReference> {
    retro.timestamp = firestore.FieldValue.serverTimestamp();
    retro.state = RETRO_STATE.NOTES;
    retro.owner = await this.userService.getOwner();
    return this.afs.collection('retrospectives').add(retro);
  }

  async joinRetro(id: string): Promise<void> {
    const owner = await this.userService.getOwner();
    return this.afs.collection('retrospectives')
        .doc(id)
        .collection('players')
        .doc(owner.userId)
        .set(owner);
  }

  getRetrospective(id: string): Observable<Retrospective> {
    return this.afs.collection('retrospectives')
        .doc<Retrospective>(id)
        .snapshotChanges()
        .pipe(map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return {id, ...data};
        }));
  }

  getRetrospectives(): Observable<Retrospective[]> {
    return this.afs
        .collection<Retrospective>(
            'retrospectives', ref => ref.orderBy('timestamp', 'desc'))
        .snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return {id, ...data};
          });
        }));
  }

  getRetroSpectivePlayers(id: string): Observable<Player[]> {
    return this.afs.collection('retrospectives')
        .doc(id)
        .collection<Player>('players')
        .snapshotChanges()
        .pipe(map(actions => actions.map(action => action.payload.doc.data())));
  }
}
