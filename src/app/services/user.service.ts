import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AlertController} from '@ionic/angular';
import {Player, User} from 'types';

import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
  private currentUser: Partial<User>;
  private userDoc: AngularFirestoreDocument;

  constructor(
      private readonly afs: AngularFirestore,
      private readonly authService: AuthService,
      private readonly alertController: AlertController,
  ) {
    this.currentUser = {};
    this.subscribeToUser();
  }

  async getCurrentUserId(): Promise<string> {
    if (this.currentUser.id) {
      return this.currentUser.id;
    }

    // go get/create the userId from the auth service
    this.currentUser.id = await this.authService.getUserId();
    return this.currentUser.id;
  }

  getCurrentUserName(): Promise<string> {
    return new Promise(async resolve => {
      if (this.currentUser.name) {
        resolve(this.currentUser.name);
      } else {
        const alert = await this.alertController.create({
          header: 'What\'s your name?',
          inputs: [{
            name: 'name',
            type: 'text',
            placeholder: 'Your Name',
          }],
          buttons: [{
            text: 'Ok',
            handler: async ({name}) => {
              if (name) {
                await this.saveName(name);
                resolve(name);
              } else {
                const name = await this.getCurrentUserName();
                await this.saveName(name);
                resolve(name);
              }
            }
          }]
        });

        await alert.present();
      }
    });
  }

  async getOwner(): Promise<Player> {
    return {
      name: await this.getCurrentUserName(),
      userId: await this.getCurrentUserId(),
    };
  }

  private async subscribeToUser() {
    const id = await this.getCurrentUserId();
    this.currentUser.id = id;
    this.userDoc = this.afs.collection('users').doc(id);

    // subscribe to changes from the database
    this.userDoc.valueChanges().subscribe(user => {
      this.currentUser = {...this.currentUser, ...user};
    })
  }

  private async saveName(name: string): Promise<void> {
    this.currentUser.name = name;
    return this.userDoc.set(this.currentUser);
  }
}
