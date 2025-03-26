import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  template: `<div
    class=""
    style=""
  >
    <div class="text-2xl font-bold">One Simple Component</div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent {
 
  constructor() {}
}
