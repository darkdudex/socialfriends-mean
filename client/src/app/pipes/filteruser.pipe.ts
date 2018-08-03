import { Injectable, Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filterUser'
})

@Injectable()
export class FilterUserPipeModule implements PipeTransform {

  transform(items: any, term: any):any {

    if (term == undefined)
      return items;
    
    return items.filter(item => {
      return item.displayName.toLowerCase().includes(term.toLowerCase())
    })

  }

}