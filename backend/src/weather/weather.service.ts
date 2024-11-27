import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './weather.schema';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Weather.name) private readonly weatherModel: Model<Weather>,
  ) {}

  async getWeatherByCoordinates(
    lat: number,
    lon: number,
    name: string,
    country: string,
    state?: string,
  ): Promise<any> {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response$ = this.httpService
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: { lat, lon, appid: apiKey, units: 'metric' },
      })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            {
              status:
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
              message:
                error.response?.data?.message || 'Failed to fetch weather data',
            },
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );

    const response = await lastValueFrom(response$);
    const data = response.data;

    const existingWeather = await this.weatherModel
      .findOne({ lat, lon })
      .exec();
    if (existingWeather) {
      existingWeather.temp = data.main.temp;
      existingWeather.weather = data.weather;
      existingWeather.updatedAt = new Date();
      await existingWeather.save();
      return existingWeather;
    }

    const weather = new this.weatherModel({
      lat,
      lon,
      name,
      country,
      state,
      temp: data.main.temp,
      weather: data.weather,
    });
    await weather.save();
    return weather;
  }

  async getLastQueries(): Promise<Weather[]> {
    return this.weatherModel.find().sort({ updatedAt: -1 }).limit(100).exec();
  }

  async getAutocomplete(query: string): Promise<any> {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response$ = this.httpService
      .get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: { q: query, limit: 5, appid: apiKey },
      })
      .pipe(
        catchError((error) => {
          throw new HttpException(
            {
              status:
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
              message:
                error.response?.data?.message ||
                'Failed to fetch autocomplete suggestions',
            },
            error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      );

    return await lastValueFrom(response$).then((res) => res.data);
  }
}
