import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService, Book } from '../../../app/services/book.service';
declare var bootstrap: any;

@Component({
  selector: 'app-all-books',
  standalone: true,
  templateUrl: './all-books.component.html',
  imports: [CommonModule, RouterModule],
})
export class AllBooksComponent implements OnInit {
  books: Book[] = [];
  selectedBookId: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

/*   addToMyBooks(bookId: string) {
    this.bookService.addBookToUser(bookId).subscribe(() => {
      alert('Book added to your personal list!');
    });
  } */
  openAddConfirmModal(bookId: string) {
    this.selectedBookId = bookId;
    const modalElement = document.getElementById('addConfirmModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmAdd() {
    this.bookService.addBookToUser(this.selectedBookId).subscribe(() => {
      const modalElement = document.getElementById('addConfirmModal');
      const modal = bootstrap.Modal.getInstance(modalElement!);
      modal?.hide();
    });
  }
}
