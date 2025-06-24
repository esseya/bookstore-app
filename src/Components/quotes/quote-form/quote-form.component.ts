import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuoteService, CreateQuoteDto, Quote } from '../../../app/services/quote.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quote-form.component.html',
})
export class QuoteFormComponent implements OnInit {
  quoteForm: FormGroup;
  isEdit = false;
  quoteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quoteForm = this.fb.group({
      text: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.quoteId = this.route.snapshot.paramMap.get('id');
    if (this.quoteId) {
      this.isEdit = true;
      this.quoteService.getQuoteById(this.quoteId).subscribe({
        next: (quote) => {
          // Slice publishedDate to YYYY-MM-DD if present
          const patchedQuote = {
            ...quote,
            publishedDate: quote.publishedDate ? quote.publishedDate.slice(0, 10) : ''
          };
          this.quoteForm.patchValue(patchedQuote);
        },
        error: (err) => console.error('Failed to load quote', err),
      });
    }
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;

    const quote: CreateQuoteDto = this.quoteForm.value;

    if (this.isEdit && this.quoteId) {
      this.quoteService.updateQuote({ id: this.quoteId, ...quote }).subscribe(() => {
        this.router.navigate(['/quotes']);
      });
    } else {
      this.quoteService.addQuote(quote).subscribe(() => {
        this.router.navigate(['/quotes']);
      });
    }
  }
}
