import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponentLabel } from './home.label';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listPublications: Array<any> = []
  public listComments: Array<any> = []
  public user: any = {}
  public page = 1;
  public page2 = 1;
  public finished: boolean = true;
  public filesToUpload: Array<File> = [];
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
    const x = likeArray.filter(item => item.userId._id == this.user._id)
    return x.length > 0 ? true : false
  }

  FollowsModal(value){
    
    switch(value){
      case 'follower':{
        this.store.dispatch(new ModalShow('follower'));
        break;
      }
      case 'following':{
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
    private store: Store<any>
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.GetPublicationByUserId();
    this.GetFollowerByUserId();
    this.GetFollowingByUserId();
  }

  ngOnInit() {
    this.store.select('modal').subscribe(res => {
      
      if(res != null)
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

  public Notification() {

    this.iziToast.show({
      id: 'haduken',
      theme: 'dark',
      title: 'Maria Batty',
      message: 'Te ha seguido.',
      position: 'topCenter',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      progressBarColor: 'rgb(0, 255, 184)',
      image: 'https://instagram.fbaq1-1.fna.fbcdn.net/vp/170774ee276840af3c8469b97e4b95de/5C0F2BD6/t51.2885-19/s150x150/37786444_1087880661366353_2496499085679263744_n.jpg',
      imageWidth: 70,
      layout: 2,
      backgroundColor: '#0275D8',
      onClosing: function () {
        console.info('onClosing');
      },
      onClosed: function (instance, toast, closedBy) {
        console.info('Closed | closedBy: ' + closedBy);
      },
      iconColor: 'rgb(0, 255, 184)'
    });

    // this.iziToast.show({
    //   id: 'haduken',
    //   theme: 'dark',
    //   icon: 'icon-contacts',
    //   title: '@mariabatty',
    //   message: '<b>Te ha dado un like',
    //   position: 'bottomRight',
    //   transitionIn: 'flipInX',
    //   transitionOut: 'flipOutX',
    //   progressBarColor: 'rgb(0, 255, 184)',
    //   image: 'https://instagram.fbaq1-1.fna.fbcdn.net/vp/170774ee276840af3c8469b97e4b95de/5C0F2BD6/t51.2885-19/s150x150/37786444_1087880661366353_2496499085679263744_n.jpg',
    //   imageWidth: 70,
    //   layout: 2,
    //   backgroundColor: '#D9534F',
    //   onClosing: function () {
    //     console.info('onClosing');
    //   },
    //   onClosed: function (instance, toast, closedBy) {
    //     console.info('Closed | closedBy: ' + closedBy);
    //   },
    //   iconColor: 'rgb(0, 255, 184)'
    // });

  }

  PublicationClick(type, src) {

    // if (type.includes('image'))
    //   $("#filep").html(`<img id="imgp" src="${src}" height="100%" width="100%">`)

    // if (type.includes('video'))
    //   $("#filep").html(`<video width="100%" height="100%" controls> <source id="imgp" src="${src}" type="video/mp4"> </video>`)

  }

  onScroll() {
    this.page++;
    this.GetPublicationByUserId();
  }

  onScroll2() {
    this.page2++;
    this.GetFollowerByUserId();
  }

  Files(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
  }

  public AddPublication(dataForm) {

    // document.getElementById('loader').classList.add('is-active')

    const publication = dataForm.value
    publication.userId = this.user._id

    /* Si el usuario publica solo mensaje (sin imágen o vídeo) */
    if (this.filesToUpload.length == 0) {

      publication.filePublication = []

      this.publicationService.AddPublication(publication).subscribe(
        res => {
          this.listPublications.unshift(res[0])
          dataForm.reset();
          //document.getElementById('loader').classList.remove('is-active')
        },
        err => {
          console.log(err.error)
        })

    } else {

      this.fileService.AddFile(this.filesToUpload, this.user._id, 'publications').subscribe(
        res => {

          publication.filePublication = res

          this.publicationService.AddPublication(publication).subscribe(
            res => {
              this.listPublications.unshift(res[0])
              //document.getElementById("CloseButton").click()
              dataForm.reset();
              this.filesToUpload = [];
              //document.getElementById('loader').classList.remove('is-active')
            },
            err => {
              console.log(err)
            })

        },
        err => {
          console.log(err)
        }
      )

    }

  }

  public GetPublicationByUserId() {

    this.publicationService.GetPublicationByUserId(this.user._id, this.page).subscribe(
      res => {

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
      userId: this.user._id,
    }

    if (event.keyCode === 13) {

      this.commentService.AddComment(body).subscribe(
        res => {

          let response = res
          delete response.userId
          response.userId = {
            avatar: this.user.avatar,
            displayName: this.user.displayName
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
      userId: this.user._id,
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

  test(userPublication) {
    console.log(userPublication)
  }

}
