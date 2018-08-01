import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { FileService } from '../../services/file.service';


@Component({
  selector: 'userprofile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
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
