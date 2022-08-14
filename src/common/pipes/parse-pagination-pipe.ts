import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParsePaginationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _metadata: ArgumentMetadata): string {
    console.log(value);
    return '';
  }
}
