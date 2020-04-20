import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PlayerStatus, Retro, RETRO_STATE} from 'types';

import {UserService} from './user.service';

@Injectable({providedIn: 'root'})
export class RetroService {
  db = firestore();

  constructor(
      private readonly afs: AngularFirestore,
      private readonly userService: UserService,
  ) {}

  async createRetro(retro: Partial<Retro>): Promise<DocumentReference> {
    retro.timestamp = firestore.FieldValue.serverTimestamp();
    retro.state = RETRO_STATE.NOTES;
    retro.owner = await this.userService.getOwner();

    // create the retro, then immediately join it
    const ref = await this.afs.collection('retros').add(retro);
    this.joinRetro(ref.id);

    return ref;
  }

  async updateRetro(id: string, data: Partial<Retro>): Promise<void> {
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

  getRetro(id: string): Observable<Retro> {
    return this.afs.collection('retros').doc<Retro>(id).snapshotChanges().pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return {id, ...data};
        }));
  }

  getRetros(): Observable<Retro[]> {
    return this.afs
        .collection<Retro>('retros', ref => ref.orderBy('timestamp', 'desc'))
        .snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return {id, ...data};
          });
        }));
  }

  getRetroPlayers(id: string): Observable<PlayerStatus[]> {
    return this.afs.collection('retros')
        .doc(id)
        .collection<PlayerStatus>('players', ref => ref.orderBy('name'))
        .snapshotChanges()
        .pipe(map(actions => actions.map(action => action.payload.doc.data())));
  }

  async playerIsInRetro(retroId: string): Promise<boolean> {
    const userId = await this.userService.getCurrentUserId();
    const snapshot = await this.db.collection('retros')
                         .doc(retroId)
                         .collection('players')
                         .doc(userId)
                         .get();

    // if a document exists at this path, the user is already in the game
    return snapshot.exists;
  }

  async updateRetroPlayer(
      retroId: string, userId: string,
      data: Partial<PlayerStatus>): Promise<void> {
    return this.afs.collection('retros')
        .doc(retroId)
        .collection('players')
        .doc(userId)
        .update(data);
  }
}
