import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { BookListComponent } from '../Components/books/book-list/book-list.component';
import { BookFormComponent } from '../Components/books/book-form/book-form.component';

import { AllBooksComponent } from '../Components/books/all-books/all-books.component';
import { RegisterComponent } from './pages/register/register.component';
import { QuoteListComponent } from '../Components/quotes/quote-list/quote-list.component';
import { QuoteFormComponent } from '../Components/quotes/quote-form/quote-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookListComponent, canActivate: [authGuard] },
  { path: 'books/add', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'quotes', component: QuoteListComponent },
  { path: 'add-quote', component: QuoteFormComponent },
  { path: 'edit-quote/:id', component: QuoteFormComponent },
  { path: 'books/all', component: AllBooksComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

export const appRouting = provideRouter(routes);
