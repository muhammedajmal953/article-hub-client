import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { CommonModule, DatePipe } from '@angular/common';

interface Article {
  _id:string
  heading: string,
  content: string,
  image: string,
  createdAt:Date
}

@Component({
  selector: 'app-show-content',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './show-content.component.html',
  styleUrl: './show-content.component.css'
})
export class ShowContentComponent implements OnInit {
  article!: Article

  articles!:Article[]
relatedPosts: any;
  constructor(private _activatedRoute: ActivatedRoute, private _articleService: ArticlesService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      const id = params['id']
      this._articleService.getArticle(id).subscribe({
        next: (res:any) => {
          if (res?.success) {
            this.article=res.data
          }
        }
      })
    })
  }


}
