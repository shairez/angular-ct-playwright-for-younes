import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

@Component({
  selector: 'app-grid',
  imports: [AgGridAngular],
  template: `<div
    class="flex flex-col gap-10"
    style="width: 100%; height: 100%;"
  >
    <div>shai</div>
    <ag-grid-angular
      style="width: 100%; height: 550px;"
      [rowData]="rowData"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
    />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  rowData: IRow[] = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'BMW', model: 'i4', price: 56395, electric: true },
    { make: 'Audi', model: 'A4', price: 39900, electric: false },
    { make: 'Honda', model: 'Civic', price: 22350, electric: false },
    { make: 'Hyundai', model: 'IONIQ 5', price: 41450, electric: true },
    { make: 'Volkswagen', model: 'ID.4', price: 37495, electric: true },
    { make: 'Kia', model: 'EV6', price: 42600, electric: true },
    { make: 'Chevrolet', model: 'Bolt', price: 26500, electric: true },
    { make: 'Porsche', model: 'Taycan', price: 86700, electric: true },
    { make: 'Mazda', model: 'CX-5', price: 26250, electric: false },
    { make: 'Subaru', model: 'Outback', price: 28395, electric: false },
    { make: 'Volvo', model: 'XC40', price: 36350, electric: false },
    { make: 'Lexus', model: 'RX', price: 46995, electric: false },
    { make: 'Jeep', model: 'Wrangler', price: 31195, electric: false },
    { make: 'Ram', model: '1500', price: 37090, electric: false },
    { make: 'GMC', model: 'Sierra', price: 32998, electric: false },
    { make: 'Acura', model: 'MDX', price: 49050, electric: false },
    { make: 'Infiniti', model: 'QX60', price: 49045, electric: false },
    { make: 'Land Rover', model: 'Defender', price: 51700, electric: false },
    { make: 'Genesis', model: 'GV70', price: 43150, electric: false },
    { make: 'Cadillac', model: 'Lyriq', price: 58590, electric: true },
    { make: 'Rivian', model: 'R1T', price: 73000, electric: true },
    { make: 'Polestar', model: '2', price: 48400, electric: true },
    { make: 'Lucid', model: 'Air', price: 87400, electric: true },
    { make: 'Mini', model: 'Cooper', price: 26900, electric: false },
    { make: 'Chrysler', model: 'Pacifica', price: 37095, electric: false },
    { make: 'Dodge', model: 'Challenger', price: 30940, electric: false },
    { make: 'Maserati', model: 'Ghibli', price: 76200, electric: false },
    { make: 'Alfa Romeo', model: 'Giulia', price: 43350, electric: false },
    { make: 'Bentley', model: 'Continental', price: 202500, electric: false },
    { make: 'Aston Martin', model: 'DB11', price: 205600, electric: false },
    { make: 'Ferrari', model: 'F8', price: 276550, electric: false },
    { make: 'Lamborghini', model: 'Urus', price: 229495, electric: false },
    { make: 'McLaren', model: '720S', price: 299000, electric: false },
    { make: 'Rolls-Royce', model: 'Ghost', price: 311900, electric: false },
    { make: 'Bugatti', model: 'Chiron', price: 3000000, electric: false },
    { make: 'Lotus', model: 'Emira', price: 74900, electric: false },
    { make: 'Jaguar', model: 'F-Type', price: 71300, electric: false },
    { make: 'Lincoln', model: 'Navigator', price: 76710, electric: false },
    { make: 'Buick', model: 'Enclave', price: 42800, electric: false },
    { make: 'Smart', model: 'EQ', price: 29900, electric: true },
    { make: 'Fisker', model: 'Ocean', price: 37499, electric: true },
    { make: 'BYD', model: 'Seal', price: 45000, electric: true },
    { make: 'NIO', model: 'ET7', price: 69700, electric: true },
    { make: 'Xpeng', model: 'P7', price: 32950, electric: true },
  ];
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };
  constructor() {}
}
