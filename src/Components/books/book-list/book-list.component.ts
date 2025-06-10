import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookService, Book } from '../../../app/services/book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
declare var bootstrap: any;


@Component({
  standalone: true,
  selector: 'app-book-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBookId: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getMyBooks().subscribe((books) => (this.books = books));
  }

  editBook(id: string) {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }
  openConfirmModal(bookId: string) {
    this.selectedBookId = bookId;
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    this.bookService.deleteBook(this.selectedBookId).subscribe(() => {
      this.loadBooks();

      const modalElement = document.getElementById('confirmModal');
      const modal = bootstrap.Modal.getInstance(modalElement!);
      modal?.hide();
    });
  }
}

