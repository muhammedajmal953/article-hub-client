import { Component, OnInit } from '@angular/core';
import { EditArticleComponent } from "../../components/edit-article/edit-article.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [EditArticleComponent],
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.css'
})
export class EditContentComponent implements OnInit{
  id!:string
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
       this.id = params['id']
      })
  }
}
