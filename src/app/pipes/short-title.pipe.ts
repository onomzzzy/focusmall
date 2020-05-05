import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortTitle",
})
export class ShortTitlePipe implements PipeTransform {
  transform(value: String, arg: number): String {
    if (name == 0) {
      if (value.length > 18) {
        return value.substr(0, 16) + "..";
      }
    } else if (name == 1) {
      if (value.length > 47) {
        return value.substr(0, 44) + "..";
      }
    }
    return value;
  }
}
