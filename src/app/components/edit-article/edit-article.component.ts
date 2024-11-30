import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticlesService } from '../../services/articles.service';
import { CloudineryService } from '../../services/cloudinery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css',
})
export class EditArticleComponent implements OnInit {
  @Input() articleId!: string;
  article!: {
    _id: string;
    heading: string;
    content: string;
    image: string;
  };
  formData!: FormGroup;
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private _cloudineryService: CloudineryService,
    private _articleService: ArticlesService,
    private _router: Router
  ) {
    this.formData = this.fb.group({
      heading: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')],
      ],
      content: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')],
      ],
      file: [File || '', [ this.fileValidator]],
    });
  }

  ngOnInit(): void {
    this._articleService.getArticle(this.articleId).subscribe({
      next: (res:any) => {
        if (res.success) {
          this.article = res.data

          this.formData.patchValue({
            heading: this.article.heading,
            content:this.article.content
          })
        }
      },
      error:(error)=>{
        Swal.fire({
          icon: error,
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          title:error.error.message
        })
      }
    })
  }
  onSubmit(id: string) {
    if (this.formData.valid) {
      const articleData = {
        heading: this.formData.get('heading')?.value,
        content: this.formData.get('content')?.value,
        image: this.article.image,
      };
      if (this.selectedFile) {
        this._cloudineryService
          .uploadToCloudinery(this.selectedFile)
          .subscribe((resp: any) => {
            if (resp) {
              articleData.image=resp.url
              this.updateArticle(this.articleId,articleData)

            }
          });
      } else {
        this.updateArticle(this.articleId,articleData)
      }
      console.log('Form Submitted', this.formData);
    } else {
      this.formData.markAllAsTouched()
      console.log('Form is invalid');
    }
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.formData.get('file')?.setValue(input.files[0]);
      this.formData.get('file')?.updateValueAndValidity();
    } else {
      this.selectedFile = undefined;
      this.formData.get('file')?.setValue(null);
    }
  }

  fileValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const file = control.value as File;
    if (!file || !(file instanceof File)) {
      return null;
    }

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return { fileType: true };
    }

    if (file.size > maxSize) {
      return { fileSize: true };
    }

    return null;
  }

  updateArticle(id: string, articleData:any) {
    this._articleService.editArticle(id, articleData).subscribe({
      next: (res: any) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            toast: true,
            showConfirmButton: false,
            title: res.message,
          });
          this._router.navigate(['/myArticles']);
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          timer: 2000,
          toast: true,
          showConfirmButton: false,
          title: error.error.message,
        });
      },
    });
  }
}
