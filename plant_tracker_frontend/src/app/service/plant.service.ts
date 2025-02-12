import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService implements OnInit{

  constructor() {}
  // booksList: Book[] = [];

  ngOnInit(): void {
    console.log("LifeCycy;e");
    // this.loadBooks();
  }

  // addBook(book: Book) {
  //   const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
  //   books.push(book);
  //   localStorage.setItem('books', JSON.stringify(books));
  //   console.log('Book zapisana:', book);
  //   this.loadBooks();
  // }

  // loadBooks(): Book[] {
  //   const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
  //   this.booksList = books;
  //   return books;
  // }

  // getBookById(id: string): Book | undefined {
  //   const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
  //   return books.find((book) => book.id === id);
  // }


  // deleteBook(id: string | null): void {
  //   if (!id) return;

  //   const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
  //   const updatedBooks = books.filter((book) => book.id !== id);
  //   localStorage.setItem('books', JSON.stringify(updatedBooks));
  //   this.booksList = updatedBooks;
  // }
}
