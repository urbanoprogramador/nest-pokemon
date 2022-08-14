import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(private readonly servicesPokemon: PokemonService) {}
  async create() {

    const result = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const res = result.data.results;

    res.forEach(({name, url})=>{
      const segments = url.split('/');
      const data: CreatePokemonDto = {
        no: +segments[segments.length-2],
        name: name
      }
      this.servicesPokemon.create(data);
    });
    return 'base de dato cargada';
  }
}
