import { Injectable, Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'userfilter'
})

@Injectable()
export class FilterUserPipe implements PipeTransform {

  transform(items: any, term: any):any {

    if (term == undefined || term.trim() === ""){
      return items;
    } 

    return items.filter( item => {
      return item.displayName.toLowerCase().includes(term.toLowerCase())
    })

  }

}