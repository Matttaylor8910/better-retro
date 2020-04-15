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

    // create the retro, then immediately join it
    const ref = await this.afs.collection('retros').add(retro);
    this.joinRetro(ref.id);

    return ref;
  }

  async updateRetro(id: string, data: Partial<Retrospective>): Promise<void> {
    return this.afs.collection('retros').doc(id).update(data);
  }

  async joinRetro(id: string): Promise<void> {
    const owner = await this.userService.getOwner();
    return this.afs.collection('retros')
        .doc(id)
        .collection('players')
        .doc(owner.userId)
        .set(owner);
  }

  getRetrospective(id: string): Observable<Retrospective> {
    return this.afs.collection('retros')
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
            'retros', ref => ref.orderBy('timestamp', 'desc'))
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
    return this.afs.collection('retros')
        .doc(id)
        .collection<PlayerStatus>('players', ref => ref.orderBy('name'))
        .snapshotChanges()
        .pipe(map(actions => actions.map(action => action.payload.doc.data())));
  }

  async updateRetrospectivePlayer(
      retroId: string, userId: string,
      data: Partial<PlayerStatus>): Promise<void> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection('players')
        .doc(userId)
        .update(data);
  }
}
