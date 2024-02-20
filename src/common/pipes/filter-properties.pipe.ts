import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FilterPropertiesPipe implements PipeTransform {
  constructor(private readonly allowedProperties: string[ ]) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Invalid request body');
    }

    // Filter out properties not included in allowedProperties
    const filteredValue = Object.keys(value)
      .filter((key) => this.allowedProperties.includes(key))
      .reduce((obj, key) => {
        obj[key] = value[key];
        return obj;
      }, {});

    return filteredValue;
  }
}
