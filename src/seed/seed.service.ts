import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  private readonly http:AxiosAdapter = new AxiosAdapter();
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create() {
    this.pokemonModel.deleteMany();
    const result = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    console.log(result);
    const res = result.data.results;
    const pokemonsList=res.map(({ name, url }) => {
      const segments = url.split('/');
      return {
        no: +segments[segments.length - 2],
        name: name,
      }
    });
    await this.pokemonModel.insertMany(pokemonsList);
    return 'base de dato cargada';
  }
}
