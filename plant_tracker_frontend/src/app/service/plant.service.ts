import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Species } from '../models/species.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private constructor(private httpClient: HttpClient) {}

  public plantsList: Plant[] = [];
  public authHeader: string = localStorage.getItem('authHeader') || '';
  private userId: number = Number(localStorage.getItem('userId')) || 0;

  public addPlant(plant: Plant): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });
    console.log(plant, "WYSYŁANIE");

    return this.httpClient.post<string>(
      `http://localhost:8080/plants/${this.userId}`,
      plant,
      { headers, responseType: 'text' as 'json' }
    ).pipe(
      catchError((error) => {
        console.error('Error occurred while adding plant:', error);

        return throwError(() => new Error('Failed to add plant, please try again later.'));
      })
    );
  }

  public loadPlants(): Observable<Plant[]> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Plant[]>(
      'http://localhost:8080/plants',
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error occurred while loading plants:', error);
        
        return throwError(() => new Error('Failed to load plants, please try again later.'));
      })
    );
  }

  public getPlantById(id: number): Observable<Plant> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Plant>(
      `http://localhost:8080/plants/${id}`,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error(`Error occurred while getting plant with ID ${id}:`, error);
        
        return throwError(() => new Error(`Failed to load plant with ID ${id}, please try again later.`));
      })
    );
  }

  public updatePlant(plant: Plant, id: number | null): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.put(
      `http://localhost:8080/plants/${this.userId}/${id}`,
      plant,
      { headers, responseType: 'text' }
    ).pipe(
      catchError((error) => {
        console.error(`Error occurred while updating plant with ID ${id}:`, error);
        
        return throwError(() => new Error(`Failed to update plant with ID ${id}, please try again later.`));
      })
    );
  }

  public deletePlant(id: number | null): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.delete(
      `http://localhost:8080/plants/${id}`,
      { headers, responseType: 'text' }
    ).pipe(
      catchError((error) => {
        console.error(`Error occurred while deleting plant with ID ${id}:`, error);
        
        return throwError(() => new Error(`Failed to delete plant with ID ${id}, please try again later.`));
      })
    );
  }

  public loadSpecies(): Observable<Species[]> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Species[]>(
      `http://localhost:8080/plants/species`,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error occurred while loading species:', error);
        
        return throwError(() => new Error('Failed to load species, please try again later.'));
      })
    );
  }


  public searchPlantsBySpecies(userId: number, prefix: string): Observable<Plant[]> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Plant[]>(
      `http://localhost:8080/plants/search/${userId}?prefix=${prefix}`, 
      { headers}).pipe(
      catchError((error) => {
        console.error('Error occurred while searching plant by prefix:', error);
          
        return throwError(() => new Error('Failed to search plants, please try again later.'));
      })
    );
  }

  

  public filterBySpecies(userId: number, speciesNames: string[] ): Observable<Plant[]>{
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Plant[]>(
      `http://localhost:8080/plants/filter/${userId}/${speciesNames.join(',')}`,
      { headers}).pipe(
      catchError((error) => {
        console.error('Error occurred while filtering plants by checkboxes:', error);
            
        return throwError(() => new Error('Failed to filter plants, please try again later.'));
      })
    );
  }


  public sortByLastWateredDate(userId: number, sortOrder: string): Observable<Plant[]> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Plant[]>(
      `http://localhost:8080/plants/plants/${userId}`,
      { params,   headers }
    ).pipe(
      catchError((error) => {
        console.error('Error occurred while filtering plants by checkboxes:', error);
            
        return throwError(() => new Error('Failed to filter plants, please try again later.'));
      })
    );
  }
}
