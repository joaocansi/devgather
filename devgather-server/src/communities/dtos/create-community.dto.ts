import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateCommunityDTO {
  @IsUrl()
  image: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  @ArrayMinSize(1)
  tags: string[];
}
