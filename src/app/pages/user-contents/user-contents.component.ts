import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-contents',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-contents.component.html',
  styleUrl: './user-contents.component.css'
})
export class UserContentsComponent implements OnInit {
  constructor(private _router: Router, private _articleSerivice: ArticlesService) { }
  articles!: any


  ngOnInit(): void {
    this._articleSerivice.getOwnArticles().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.articles = res.data
        }
      }
    })
  }

  addArticle() {
    this._router.navigate(['/add-article'])
  }
  editArticle(id: string) {
    this._router.navigate([`/edit-article/${id}`])
  }

  deleteArticle(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'if it deleted',
      toast: true,
      showCancelButton: true,

    }).then((res) => {
      if (res.isConfirmed) {
        this._articleSerivice.deleteArticle(id).subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire({
                icon: 'success',
                title: 'Article Deleted success fully',
                toast: true,
                timer: 2000,
                showConfirmButton:false
              })
              this.articles=this.articles.filter((cur:any)=>cur._id!=id)
            }
          }
        })
      }
    })

  }

}
