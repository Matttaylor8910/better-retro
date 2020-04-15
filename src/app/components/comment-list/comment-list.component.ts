import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CommentService} from 'src/app/services/comment.service';
import {UserService} from 'src/app/services/user.service';
import {Comment, CommentCollection, RETRO_STATE, Retrospective} from 'types';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() collection: CommentCollection;
  @Input() retro: Retrospective;

  private destroyed$ = new Subject<void>();
  private myComments: Comment[] = [];
  private allComments: Comment[] = [];

  constructor(
      private readonly commentService: CommentService,
      private readonly userService: UserService,
  ) {}

  get comments(): Comment[] {
    if (!this.retro) return [];

    return this.retro.state === RETRO_STATE.NOTES ? this.myComments :
                                                    this.allComments;
  }

  ngOnInit() {
    this.commentService.getComments(this.retro.id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(async comments => {
          this.allComments = comments;

          const userId = await this.userService.getCurrentUserId();
          this.myComments =
              comments.filter(comment => comment.owner.userId === userId);
        })
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
