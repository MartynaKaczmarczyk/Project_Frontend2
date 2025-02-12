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

  // ngOnInit(): void {
  //   console.log("LifeCycy;e");
  //   // this.loadBooks();
  // }

  public addPlant(plant: Plant): void {
    const plants: Plant[] = []; //JSON.parse(localStorage.getItem('books') || '[]');
    plants.push(plant);
    //localStorage.setItem('books', JSON.stringify(plants));
    console.log('roślina zapisana:', plant);
    this.loadPlants();
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
  
    // const plants: Plant[] = []; //JSON.parse(localStorage.getItem('books') || '[]');
    // this.plantsList = plants;
    
    // return plants;
  }

  public getPlantById(id: number): Plant | undefined {
    //const plants: Book[] = //JSON.parse(localStorage.getItem('books') || '[]');
    return this.plantsList.find((plant) => plant.id === id);
  }


  public deletePlant(id: number | null): void {
    console.log(id);
    if (!id) return;
    const plants: Plant[] = []; //JSON.parse(localStorage.getItem('books') || '[]');
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    //localStorage.setItem('books', JSON.stringify(updatedBooks));
    this.plantsList = updatedPlants;
    console.log(this.plantsList);
  }
}
