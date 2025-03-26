import { TestBed } from '@angular/core/testing';
import { describe, expect, test } from '@testUtils/vitest';
import { SimpleComponent } from './simple.component';

describe('SimpleComponent', () => {
  test('should render', async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(SimpleComponent);
    fixture.detectChanges();
    
    const element = fixture.nativeElement.querySelector('.text-2xl.font-bold') as HTMLElement;
    expect(element.textContent).toBe('One Simple Component');
    
  });
});
