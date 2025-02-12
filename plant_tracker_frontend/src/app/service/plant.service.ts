import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantService{

  private constructor(private httpClient: HttpClient) {}

  public plantsList: Plant[] = [];


  public addPlant(plant: Plant): Observable<Plant> {
    return this.httpClient.post<Plant>(
      'http://localhost:8080/plants',
      plant
    );
  }

  
  public loadPlants(): Observable<Plant[]> {
    const username = 'john.doe@example.com';  
    const password = 'password123'; 
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: authHeader,
    });
    
    return this.httpClient.get<Plant[]>(
      'http://localhost:8080/plants',
      { headers }
    );
  }

  public getPlantById(id: number): Observable<Plant>{
    const username = 'john.doe@example.com';  
    const password = 'password123'; 
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: authHeader,
    });
    
    return this.httpClient.get<Plant>(
      `http://localhost:8080/plants/${id}`,
      { headers }
    );
  }


  public deletePlant(id: number | null): Observable<string> {
    const username = 'john.doe@example.com';  
    const password = 'password123'; 
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: authHeader,
    });
    
    return this.httpClient.delete(`http://localhost:8080/plants/${id}`, {
      headers, responseType: 'text'
    });
  }
}
