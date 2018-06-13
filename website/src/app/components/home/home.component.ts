import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavComponent } from '../nav/nav.component';
import { ModalUtilityComponent } from '../modal-utilitiy/modalutility.component';

import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { FileService } from '../../services/file.service';
import { CommentService } from '../../services/comment.service';
import { FollowerService } from '../../services/follower.service';
import { HomeComponentLabel } from './home.label';

import * as $ from 'jquery';
import { LikeService } from '../../services/like.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listPublications: Array<any> = []
  public listComments: Array<any> = []
  public user: any = {}
  public page = 1;
  public finished: boolean = true;
  public filesToUpload: Array<File> = [];
  public typeFiles = ['image', 'video'];

  public label = HomeComponentLabel.Spanish

  public message: String;

  public clickDynamicArrayLoad : Array<any> = []

  t(array){
    console.log(array)
    this.clickDynamicArrayLoad = array
  }

  p(likeArray,userId){
    const x = likeArray.filter(item => item.userId._id == this.user._id)
    return x.length > 0 ? true : false
  }

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private commentService: CommentService,
    private followerService: FollowerService,
    private fileService: FileService,
    private likeService: LikeService,
    private route: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.GetPublicationByUserId()
    console.log(this.GetLikeByPublicationId('5b202cb853ed2413889b131e'))
  }

  ngOnInit() {
  }

  PublicationClick(type, src) {

    if (type.includes('image'))
      $("#filep").html(`<img id="imgp" src="${src}" height="100%" width="100%">`)

    if (type.includes('video'))
      $("#filep").html(`<video width="100%" height="100%" controls> <source id="imgp" src="${src}" type="video/mp4"> </video>`)

  }

  onScroll() {
    this.page++;
    this.GetPublicationByUserId();
  }

  Files(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
  }

  public AddPublication(dataForm) {

    const publication = dataForm.value
    publication.userId = this.user._id

    /* Si el usuario publica solo mensaje (sin imágen o vídeo) */
    if (this.filesToUpload.length == 0) {

      publication.filePublication = []

      this.publicationService.AddPublication(publication).subscribe(
        res => {
          this.listPublications.unshift(res[0])
          dataForm.reset();
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
              document.getElementById("CloseButton").click()
              dataForm.reset();
              this.filesToUpload = [];
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

        console.log(res)

        if (res.publications.length != 6)
          this.finished = false

        if (this.listPublications.length == 0) {
          this.listPublications = res.publications;

        } else {
          res.publications.map(item => {
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
      unlike: 'https://image.flaticon.com/icons/svg/456/456257.svg',
      like: 'https://image.flaticon.com/icons/svg/456/456115.svg'
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

  test(userPublication){
    console.log(userPublication)
  }

}
