import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsPositive({
    message: (validationArguments) =>
      `No ${validationArguments.value}: debe ser un numero positivo`,
  })
  @Min(1, {
    message: 'No: debe ser maryor o igual a uno',
  })
  no: number;

  @IsString({
    message: 'name: debe ser un string',
  })
  @MinLength(2, {
    message: 'string: debe tener al menos dos caracteres',
  })
  name: string;
}
