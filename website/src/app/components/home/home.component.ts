import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { FileService } from '../../services/file.service';
import { CommentService } from '../../services/comment.service';
import { FollowerService } from '../../services/follower.service';
import { HomeComponentLabel } from './home.label';

import * as $ from 'jquery';

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

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private commentService: CommentService,
    private followerService: FollowerService,
    private fileService: FileService,
    private route: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.GetPublicationByUserId()
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

  public AddComment(event,id, pos) {

    event.preventDefault() 
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


}
