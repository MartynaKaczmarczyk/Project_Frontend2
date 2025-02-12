import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPlantComponent } from './detailed-plant.component';

describe('DetailedPlantComponent', () => {
  let component: DetailedPlantComponent;
  let fixture: ComponentFixture<DetailedPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPlantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
