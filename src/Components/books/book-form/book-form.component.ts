import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../../../app/services/book.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-book-form',
  standalone: true, 
  templateUrl: './book-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, 
  ],
})
export class BookFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  bookId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

 ngOnInit(): void {
  this.form = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    author: ['', Validators.required],
    publishedDate: ['', Validators.required],
  });

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isEdit = true;
    this.bookId = id;
   
    this.bookService.getBookById(this.bookId).subscribe((book) => {
      this.form.patchValue({
        id: book.id,
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate?.slice(0, 10), 
      });
       console.log(book);
    });
    
  }
}


  onSubmit() {
    if (this.isEdit) {
/*       this.bookService.updateBook(this.bookId.toString(), this.form.value).subscribe(() => {
        this.router.navigate(['/books']);
      });  */
      this.bookService.updateBook(this.form.value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: err => console.error('Update failed', err)
      });
    } else {
      this.bookService.addBook(this.form.value).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
