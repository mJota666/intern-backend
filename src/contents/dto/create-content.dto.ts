import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';


export class TextDataDto {
  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  body: string;
}


export class TextBlockDto {
  @IsEnum(['text'])
  type: 'text';

  @ValidateNested()
  @Type(() => TextDataDto)
  data: TextDataDto;
}

export class ImageBlockDto {
  @IsEnum(['image'])
  type: 'image';

  @IsNotEmpty()
  data: string; // URL
}

export class VideoBlockDto {
  @IsEnum(['video'])
  type: 'video';

  @IsNotEmpty()
  data: string; // URL
}

export type BlockDto = TextBlockDto | ImageBlockDto | VideoBlockDto;


export class CreateContentDto {
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)       // let union dispatch happen at runtime
  blocks: BlockDto[];

  @IsEnum(['draft', 'submitted', 'published'])
  status: 'draft' | 'submitted' | 'published';
}
