import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {orderBy} from 'lodash';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CommentService} from 'src/app/services/comment.service';
import {UserService} from 'src/app/services/user.service';
import {Comment, Retro, RETRO_STATE} from 'types';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() header: string;
  @Input() commentsIndex: number;
  @Input() retro: Retro;
  @Input() allowVoting: boolean;
  @Input() playing: boolean;
  @Input() ready: boolean = false;

  private destroyed$ = new Subject<void>();
  private myComments: Comment[] = [];
  private sortedByName: Comment[] = [];
  private sortedByVote: Comment[] = [];

  text = '';
  creating = false;
  loading = true;

  constructor(
      private readonly commentService: CommentService,
      private readonly userService: UserService,
  ) {}

  get notesState(): boolean {
    return this.retro.state === RETRO_STATE.NOTES;
  }

  get comments(): Comment[] {
    switch (this.retro.state) {
      case RETRO_STATE.NOTES:
        return this.myComments;
      case RETRO_STATE.FINISHED:
        return this.allowVoting ? this.sortedByVote : this.sortedByName;
      default:
        return this.sortedByName;
    }
  }

  create(text: string) {
    this.creating = true;
    this.commentService.addComment(this.retro.id, this.commentsIndex, {text});
    this.text = '';
    this.creating = false;
  }

  ngOnInit() {
    this.commentService.getComments(this.retro.id, this.commentsIndex)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(async comments => {
          this.sortedByName = orderBy(comments, 'owner.name');
          this.sortedByVote = orderBy(comments, 'votes', 'desc');

          const userId = await this.userService.getCurrentUserId();
          this.myComments =
              comments.filter(comment => comment.owner.userId === userId);

          this.loading = false;
        });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
