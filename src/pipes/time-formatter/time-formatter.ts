import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimeFormatterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timeFormatter',
})
export class TimeFormatterPipe implements PipeTransform {
  /**
   * Changes time to format day mothname year hh:mm:ss
   */
  transform(value: string): string {
    let returnstring = '';
    const valuedivided = value.split('T');
    const datedivided = valuedivided[0].split('-');
    const timedivided = valuedivided[1].split('.');
    const day = datedivided[2];
    const month = datedivided[1];
    const year = datedivided[0];

    returnstring += day;
    if(month == '01'){
      returnstring += ' january';
    }else if(month == '02'){
      returnstring += ' february';
    }else if(month == '03'){
      returnstring += ' march';
    }else if(month == '04'){
      returnstring += ' april';
    }else if(month == '05'){
      returnstring += ' may';
    }else if(month == '06'){
      returnstring += ' june';
    }else if(month == '07'){
      returnstring += ' july';
    }else if(month == '08'){
      returnstring += ' august';
    }else if(month == '09'){
      returnstring += ' september';
    }else if(month == '10'){
      returnstring += ' october';
    }else if(month == '11'){
      returnstring += ' november';
    }else{
      returnstring += ' december ';
    }

    returnstring += ' ' + year + ' ';

    returnstring += timedivided[0];

    return returnstring;
  }
}
