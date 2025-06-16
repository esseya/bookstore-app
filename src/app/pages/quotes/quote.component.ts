import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-quote',
  standalone: true,
  templateUrl: './quote.component.html',
  imports: [CommonModule], 
})
export class QuoteComponent {
  quotes: string[] = [
    'The only limit to our realization of tomorrow is our doubts of today. – F. D. Roosevelt',
    'In the middle of every difficulty lies opportunity. – A. Einstein',
    'Do what you can, with what you have, where you are. – T. Roosevelt',
    'The best way to predict the future is to create it. – P. Drucker',
    'Success is not the key to happiness. Happiness is the key to success. – A. Schweitzer'
  ];
}
