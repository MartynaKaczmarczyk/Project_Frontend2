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
export class PlantService{

  private constructor(private httpClient: HttpClient) {}

  public plantsList: Plant[] = [];
  public username = 'john.doe@example.com'; 
  public password = 'password123'; 
  public authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
  

  public addPlant(plant: Plant): Observable<Plant> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });
    console.log(plant, "WYSYŁANIE");
    
    return this.httpClient.post<Plant>(
      'http://localhost:8080/plants/46',
      plant,
      {headers}
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
    );
  }


  public getPlantById(id: number): Observable<Plant>{
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });
    
    return this.httpClient.get<Plant>(
      `http://localhost:8080/plants/${id}`,
      { headers }
    );
  }


  public updatePlant(plant: Plant, id: number | null): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.put(`http://localhost:8080/plants/${id}`, 
      plant, 
      { headers, responseType: 'text'}
    );
  }


  public deletePlant(id: number | null): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });
    
    return this.httpClient.delete(`http://localhost:8080/plants/${id}`, {
      headers, responseType: 'text'
    });
  }


  public loadSpecies(): Observable<Species[]> {
    const headers = new HttpHeaders({
      Authorization: this.authHeader,
    });

    return this.httpClient.get<Species[]>(`http://localhost:8080/plants/species`, 
      { headers });
  }
}
