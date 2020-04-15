import {Component, Input} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {CommentService} from 'src/app/services/comment.service';
import {Comment, CommentCollection, Retro, RETRO_STATE} from 'types';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent {
  @Input() retro: Retro;
  @Input() collection: CommentCollection;
  @Input() comment: Comment;

  editing = false;
  editableText: string;

  voteCount = 0;

  constructor(
      private readonly authService: AuthService,
      private readonly commentService: CommentService,
  ) {}

  get readonly(): boolean {
    return !this.editing || !this.notesState;
  }

  get notesState(): boolean {
    return this.retro.state === RETRO_STATE.NOTES;
  }

  get discussionState(): boolean {
    return this.retro.state === RETRO_STATE.DISCUSSION;
  }

  get votingState(): boolean {
    return this.retro.state === RETRO_STATE.VOTING;
  }

  get finishedState(): boolean {
    return this.retro.state === RETRO_STATE.FINISHED;
  }

  get myComment(): boolean {
    return this.comment.owner.userId === this.authService.currentUserId;
  }

  startEditing() {
    this.editing = true;
    this.editableText = this.comment.text;
  }

  saveEdit() {
    this.comment.text = this.editableText;
    this.commentService.updateComment(
        this.retro.id, this.collection, this.comment);
    this.editing = false;
  }

  discardEdit() {
    this.editing = false;
  }

  deleteComment() {
    this.commentService.deleteComment(
        this.retro.id, this.collection, this.comment.id);
  }

  upvote() {
    console.log('upvote');
  }

  downvote() {
    console.log('downvote');
  }
}
