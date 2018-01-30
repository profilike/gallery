import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'photoFilter'
})

export class FilterPipe implements PipeTransform{
    transform( photoList, filterBy: string) : any {
        if( photoList.length === 0 || filterBy === "all" ){
            return photoList;
        }
        return photoList.filter((photo) => photo.category === +filterBy )
    }
}