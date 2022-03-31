import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "convertToSpaces"
})
export class ConvertToSpacesPipe implements PipeTransform {
    
    transform(value: string, chr: string): string {
        return value.replace(chr, " ");
    }

}