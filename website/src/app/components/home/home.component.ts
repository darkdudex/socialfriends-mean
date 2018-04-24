import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavComponent } from '../nav/nav.component';
import { PublicationService } from '../../services/publication.service';
import { FileService } from '../../services/file.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listPublications: Array<any> = []
  public user = {}
  public page = 1;
  public finished: boolean = true;
  public filesToUpload: Array<File> = [];

  constructor(private userService: UserService, private publicationService: PublicationService, private fileService: FileService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.GetPublicationByUserId()
  }

  ngOnInit() {
  }

  PublicationClick(src){
    $( "#imgp" ).attr( "src", src );
  }

  onScroll() {
    this.page++;
    this.GetPublicationByUserId();
  }

  Files(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
    console.log('archivos seleccionados --> ' + this.filesToUpload.length)
  }

  public AddPublication(dataForm) {

    const publication = dataForm.value

    publication.userId = JSON.parse(localStorage.getItem('userInfo'))._id

    if (this.filesToUpload.length == 0) {

      publication.filePublication = []

      this.publicationService.AddPublication(publication).subscribe(
        res => {
          dataForm.reset();
        },
        err => {
          console.log(err)
        })

    } else {

      this.fileService.AddFile(this.filesToUpload).subscribe(
        res => {
          
          publication.filePublication = res

          this.publicationService.AddPublication(publication).subscribe(
            res => {
              console.log(res)
              dataForm.reset();
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

    this.publicationService.GetPublicationByUserId(JSON.parse(localStorage.getItem('userInfo'))._id, this.page).subscribe(
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
