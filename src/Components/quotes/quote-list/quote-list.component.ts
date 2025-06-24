import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuoteService, Quote } from '../../../app/services/quote.service'; // Adjust path as needed
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  imports: [CommonModule, RouterModule],

})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];
  selectedQuoteId: string = '';
  loading = false;
  error: string | null = null;

  constructor(private quoteService: QuoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.loading = true;
    this.error = null;
    this.quoteService.getAllQuotes().subscribe({
      next: (quotes) => {
        this.quotes = quotes;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load quotes';
        this.loading = false;
      },
    });
  }

  openConfirmModal(quoteId: string) {
    this.selectedQuoteId = quoteId;
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (!this.selectedQuoteId) return;

    this.quoteService.deleteQuote(this.selectedQuoteId).subscribe(() => {
      this.loadQuotes();

      const modalElement = document.getElementById('confirmModal');
      const modal = bootstrap.Modal.getInstance(modalElement!);
      modal?.hide();
    });
  }
}
