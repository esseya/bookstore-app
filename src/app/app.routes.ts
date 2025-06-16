import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { BookListComponent } from '../Components/books/book-list/book-list.component';
import { BookFormComponent } from '../Components/books/book-form/book-form.component';
import { QuoteComponent } from './pages/quotes/quote.component';
import { AllBooksComponent } from '../Components/books/all-books/all-books.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [authGuard] },
  { path: 'books', component: BookListComponent, canActivate: [authGuard] },
  { path: 'books/add', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'quotes', component: QuoteComponent},
  { path: 'books/all', component: AllBooksComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

export const appRouting = provideRouter(routes);
