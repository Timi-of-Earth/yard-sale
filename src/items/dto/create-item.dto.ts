
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateItemDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  price: number;
}