import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavComponent } from '../nav/nav.component';
import { PublicationService } from '../../services/publication.service';

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

  constructor(private userService: UserService, private publicationService: PublicationService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.GetPublicationByUserId()
  }

  ngOnInit() {
  }

  public AddPublication(dataForm) {

    const publication = dataForm.value

    publication.userId = JSON.parse(localStorage.getItem('userInfo'))._id
    publication.filePublication = []

    this.publicationService.AddPublication(publication).subscribe(
      res => {
        dataForm.reset();
      },
      err => {
        console.log(err)
      })
  }

  public GetPublicationByUserId() {

    this.publicationService.GetPublicationByUserId(JSON.parse(localStorage.getItem('userInfo'))._id, this.page).subscribe(
      res => {

        console.log(res)

        if (res.publications.length != 6)
          this.finished = false

        if (this.listPublications.length == 0) 
          this.listPublications = res.publications;

        },
      err => {
        console.log(err)
      }
    )
  }

}
