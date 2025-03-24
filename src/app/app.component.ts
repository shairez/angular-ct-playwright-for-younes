import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="main">
      <div class="content">
        <div class="left-side">
          <h1>👋 Hello {{ who() }}!</h1>
          <p>Congratulations! Your test is running. 🎉</p>
        </div>
      </div>
    </main>
  `,
})
export class AppComponent {
  who = signal('Brother');
}
