import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'modal-itylity',
  templateUrl: './modalutility.component.html',
  styleUrls: ['./modalutility.component.css']
})
export class ModalUtilityComponent implements OnInit{

  @Input()
  public image : String;

  @Input()
  public title : String;

  @Input()
  public titleColor : String

  @Input()
  public array: Array<any>

  constructor(){
    
  }

  ngOnInit(){
    console.log(this.array)
  }

}