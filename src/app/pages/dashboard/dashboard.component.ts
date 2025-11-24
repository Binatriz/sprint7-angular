import { Component, OnDestroy, OnInit } from '@angular/core';
//import { AuthService } from '../../services/auth.service';
import { Veiculo } from '../../models/veiculo.model';
import { VehicleData } from '../../models/vehicleData.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarroVin } from '../../utils/carroVinInterface';
import {  Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, CommonModule, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  carVin!: CarroVin;
  reqVin!: Subscription;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  onChange() {
    this.vinForm.controls.vin.valueChanges.subscribe((value) => {
      this.reqVin = this.dashboardService
        .buscarVin(value as string)
        .subscribe((res) => {
          this.carVin = res;
        });
    });
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getVehicles().subscribe((res) => {
      console.log(res.vehicles);
      this.vehicles = res.vehicles;
    });
    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles[Number(id) - 1];
    });
    this.onChange();
  }

  // ngOnDestroy(): void {
  //   this.reqVin.unsubscribe();
  // }
  }

