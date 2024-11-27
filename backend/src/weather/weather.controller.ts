import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('name') name: string,
    @Query('country') country: string,
    @Query('state') state?: string,
  ) {
    return this.weatherService.getWeatherByCoordinates(
      lat,
      lon,
      name,
      country,
      state,
    );
  }

  @Get('history')
  async getHistory() {
    return this.weatherService.getLastQueries();
  }

  @Get('autocomplete')
  async getAutocomplete(@Query('query') query: string) {
    return this.weatherService.getAutocomplete(query);
  }
}
