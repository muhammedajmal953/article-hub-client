import { Component, OnInit } from '@angular/core';
import { ArticleCardComponent } from "../../components/article-card/article-card.component";
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-user-feed',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './user-feed.component.html',
  styleUrl: './user-feed.component.css'
})
export class UserFeedComponent implements OnInit {
  constructor(private _articleServices:ArticlesService){}
  articles:any
  ngOnInit(): void {
    this._articleServices.getAllArticles().subscribe({
      next:(res:any)=> {
        if (res?.success) {
          this.articles = res.data
        }
      }
    })
  }
}
