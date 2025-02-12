import { Injectable } from '@angular/core';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService{

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

  public loadPlants(): Plant[] {
    const plants: Plant[] = [{
      id: 2,
      name: 'Fikus',
      description: 'Popularna roślina domowa.',
      species: {id:3, name: "Tropical"},
      lastWatered: new Date(),
      created: new Date()
    }]; //JSON.parse(localStorage.getItem('books') || '[]');
    this.plantsList = plants;
    
    return plants;
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
