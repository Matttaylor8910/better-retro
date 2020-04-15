import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Player, PlayerStatus, RETRO_STATE, Retrospective} from 'types';

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

  async updateRetro(id: string, data: Partial<Retrospective>): Promise<void> {
    return this.afs.collection('retrospectives').doc(id).update(data);
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

  getRetrospectivePlayers(id: string): Observable<PlayerStatus[]> {
    return this.afs.collection('retrospectives')
        .doc(id)
        .collection<PlayerStatus>('players', ref => ref.orderBy('name'))
        .snapshotChanges()
        .pipe(map(actions => actions.map(action => action.payload.doc.data())));
  }

  async updateRetrospectivePlayer(
      retroId: string, userId: string,
      data: Partial<PlayerStatus>): Promise<void> {
    return this.afs.collection('retrospectives')
        .doc(retroId)
        .collection('players')
        .doc(userId)
        .update(data);
  }
}
