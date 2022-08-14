import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon= await this.pokemonModel.create(createPokemonDto);
      console.log(pokemon);
      return pokemon;
    } catch (error) {
      console.log({error});
      if(error.code === 11000){
        throw new BadRequestException(`EL Pokemon ya existe ${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException('No se puede crear el pokemon revisa los logs');
    }
    
    
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(id: string) {
    let pokemon: Pokemon;

    if(!isNaN( + id )){
      pokemon = await this.pokemonModel.findOne({no:id});
    }else if(isValidObjectId(id)){
      pokemon = await this.pokemonModel.findById(id);
    }else{
      pokemon = await this.pokemonModel.findOne({name:id});
    }
    if(!pokemon){
      throw new NotFoundException(`no se encontreo el pokemon con el id ${id}`);
    } 
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);
    pokemon.name = 'nuevo';
    await pokemon.save();
    return `This action updates a #${id} pokemon`;
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
