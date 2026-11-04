import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthorDetails } from '../../books/model/book';
import { BooksService } from '../../books/service/books.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor: AuthorDetails | null = null;
  loading = false;
  private paramsSubscription?: Subscription;
  private authorSubscription?: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private booksService: BooksService = inject(BooksService);

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.authorSubscription?.unsubscribe();
      this.loading = true;
      this.authorSubscription = this.booksService.getAuthor(id).subscribe({
        next: (data: AuthorDetails) => {
          this.selectedAuthor = data;
          this.loading = false;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
          this.loading = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.authorSubscription?.unsubscribe();
  }
}
