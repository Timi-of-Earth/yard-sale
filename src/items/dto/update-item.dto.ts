
import { IsNotEmpty } from "class-validator";

export class UpdateItemDto {

  @IsNotEmpty()
  price: number;
}