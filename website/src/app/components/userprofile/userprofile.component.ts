import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavComponent } from '../nav/nav.component';
import { PublicationService } from '../../services/publication.service';
import { FileService } from '../../services/file.service';
import * as $ from 'jquery';

@Component({
  selector: 'userprofile-root',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {

  public listPublications: Array<any> = []
  public user:any = {}
  public page = 1;
  public finished: boolean = true;
  public filesToUpload: Array<File> = [];
  public typeFiles = ['image', 'video']

  constructor(private userService: UserService, private publicationService: PublicationService, private fileService: FileService, private route: Router, private activeRoute: ActivatedRoute) {

    this.activeRoute.params.subscribe(params => {
      this.userService.GetUserById(params.userId).subscribe(
        res => {
          this.user = res;
          this.GetPublicationByUserId()
        },
        err => {
          console.log(err)
        })
    })

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

  public GetPublicationByUserId() {

    this.publicationService.GetPublicationByUserId(this.user._id, this.page).subscribe(
      res => {

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
      }
    )
  }

}
