import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.scss']
})

export class GroupComponent implements OnInit {

  groupList: Array<any> = []

  constructor(
    private groupService: GroupService
  ) { 
    this.GetGroup();
  }

  ngOnInit() { }

  AddGroup(){

  }

  GetGroup(){
    this.groupService.GetGroup().subscribe(
      res => {
      this.groupList = res.groups
    },err => {
      console.log(err)
    })
  }

}