import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RETRO_STATE, Retrospective} from 'types';
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
    retro.owner = {
      userId: await this.userService.getCurrentUserId(),
      name: await this.userService.getCurrentUserName()
    };
    return this.afs.collection('retrospectives').add(retro);
  }

  getRetrospectives(): Observable<Retrospective[]> {
    return this.afs
        .collection('retrospectives', ref => ref.orderBy('timestamp', 'desc'))
        .snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Retrospective;
            const id = action.payload.doc.id;
            return {id, ...data};
          });
        }));
  }
}
