import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `

<main class="main">
  <div class="content">
    <div class="left-side">

      <h1>Hello, {{ title }}</h1>
      <p>Congratulations! Your app is running. 🎉</p>
    </div>
 
  </div>
</main>



<router-outlet />
`
})
export class AppComponent {
  title = 'angular-ct-playwright';
}
