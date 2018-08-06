import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HomeComponentLabel } from '../home/home.label';

import { Ng2IzitoastService } from 'ng2-izitoast';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { CommentService } from '../../services/comment.service';
import { FollowerService } from '../../services/follower.service';
import { FileService } from '../../services/file.service';
import { LikeService } from '../../services/like.service';
import { WebSocketService } from '../../services/websocket.service';
import { Store } from '@ngrx/store';
import { ModalShow, ModalHide } from '../../ngrx/actions/modal.actions';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'userprofile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public listPublications: Array<any> = []
  public listComments: Array<any> = []

  public userinsession: any = {};
  public user: any = {}
  public page = 1;
  public page2 = 1;
  public finished: boolean = true;
  public filesToUpload: Array<any> = [];
  public typeFiles = ['image', 'video'];

  public label = HomeComponentLabel.Spanish

  public publicationTotal: number;

  public followerUser: Array<any> = [];
  public followingUser: Array<any> = [];
  public followerTotal: number;
  public followingTotal: number;

  public message: String;

  public stateModal: any

  public clickDynamicArrayLoad: Array<any> = []

  t(array) {
    this.clickDynamicArrayLoad = array
  }

  p(likeArray, userId) {
    const x = likeArray.filter(item => item.userId._id == this.userinsession._id)
    return x.length > 0 ? true : false
  }

  FollowsModal(value) {

    switch (value) {
      case 'follower': {
        if (this.followerTotal > 0)
          this.store.dispatch(new ModalShow('follower'));
        break;
      }
      case 'following': {
        if (this.followingTotal > 0)
          this.store.dispatch(new ModalShow('following'));
        break;
      }
    }
  }

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private commentService: CommentService,
    private followerService: FollowerService,
    private fileService: FileService,
    private likeService: LikeService,
    private route: Router,
    public iziToast: Ng2IzitoastService,
    private socketService: WebSocketService,
    private store: Store<any>,
    public progress: NgProgress,
    private activeRoute: ActivatedRoute
  ) {
    this.userinsession = JSON.parse(localStorage.getItem('user'));
    this.GetUserProfile();
  }

  GetUserProfile() {
    this.activeRoute.params.subscribe(params => {
      this.userService.GetUserById(params.userId).subscribe(
        res => {
          this.user = res;
          this.GetPublicationByUserId();
          this.GetFollowerByUserId();
          this.GetFollowingByUserId();
        },
        err => {
          console.log(err)
        })
    })
  }

  ngOnInit() {
    this.store.select('modal').subscribe(res => {

      if (res != null)
        this.stateModal = res

    }, err => {
      console.log(err)
    })
  }

  GetFollowerByUserId() {
    this.followerService.GetFollowerByUserId(this.user._id).subscribe(
      res => {
        this.followerTotal = res.total;
        this.followerUser = res.response.map(item => {
          return item.followerId
        })
      }, err => {
        console.log(err)
      })
  }

  GetFollowingByUserId() {
    this.followerService.GetFollowingByUserId(this.user._id).subscribe(
      res => {
        this.followingTotal = res.total
        this.followingUser = res.response.map(item => {
          return item.userId
        })
      }, err => {
        console.log(err)
      })
  }

  onScroll() {
    this.page++;
    this.GetPublicationByUserId();
  }

  onScroll2() {
    this.page2++;
    this.GetFollowerByUserId();
  }

  public GetPublicationByUserId() {

    this.publicationService.GetPublicationByUserId(this.user._id, this.page).subscribe(
      res => {

        console.log(res)
        this.publicationTotal = res.total

        if (res.publications.length != 6)
          this.finished = false

        if (this.listPublications.length == 0) {
          this.listPublications = res.publications;
        } else {
          res.publications.forEach(item => {
            this.listPublications.push(item);
          })
        }

      },
      err => {
        console.log(err)
      })
  }

  public AddComment(event, id, pos) {

    const body = {
      comment: this.message,
      publicationId: id,
      userId: this.userinsession._id,
    }

    if (event.keyCode === 13) {

      this.commentService.AddComment(body).subscribe(
        res => {

          let response = res
          delete response.userId
          response.userId = {
            avatar: this.userinsession.avatar,
            displayName: this.userinsession.displayName
          }

          this.listPublications[pos].comment.unshift(response)
          this.message = null
        },
        err => {
          console.log(err)
        })
    }

  }


  public AddLike(data) {
    this.likeService.AddLike(data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }

  public RemoveLike(data) {
    this.likeService.RemoveLike(data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }

  public Like_And_Unlike(pubId) {

    let x = document.getElementById(`like_${pubId}`)

    const body = {
      publicationId: pubId,
      userId: this.userinsession._id,
    }

    let src = {
      unlike: 'assets/img/svg/456257.svg',
      like: 'assets/img/svg/456115.svg'
    }

    if (x.innerHTML.includes(src.unlike)) {
      x.querySelector('img').src = src.like
      this.AddLike(body)
    } else {
      x.querySelector('img').src = src.unlike
      this.RemoveLike(body)
    }

  }

  public GetLikeByPublicationId(pubId): string {

    let likes;

    this.likeService.GetLikeByPublicationId(pubId).subscribe(
      res => {

        likes = "5"
      },
      err => {

      }
    )
    return likes
  }
  
}
