import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CloudineryService } from '../../services/cloudinery.service';
import { UserService } from '../../services/user.service';
import { ArticlesService } from '../../services/articles.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-article.component.html',
})
export class AddArticleComponent {
  formData!: FormGroup;
  selectedFile?: File;

  constructor(private fb: FormBuilder, private _cloudineryService: CloudineryService, private _articleService: ArticlesService,private _router:Router) {
    this.formData = this.fb.group({
      heading: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')]],
      content: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')]],
      file: [File || '', [Validators.required, this.fileValidator]],
    });
  }

  onSubmit() {
    if (this.formData.valid && this.selectedFile) {

      this._cloudineryService.uploadToCloudinery(this.selectedFile).subscribe((resp: any) => {
        if (resp) {
          const articleData = {
            heading: this.formData.get('heading')?.value,
            content: this.formData.get('content')?.value,
            image:resp.url
          }
          this._articleService.addArticle(articleData).subscribe({
            next: (res: any) => {
              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  timer: 2000,
                  toast: true,
                  showConfirmButton: false,
                  title:res.message
                })

                this._router.navigate(['/myArticles'])
              }
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                timer: 2000,
                toast: true,
                showConfirmButton: false,
                title:error.error.message
              })
            }
          })
        }


      })

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
      this.formData.get('file')?.setValue(input.files[0])
      this.formData.get('file')?.updateValueAndValidity();
    } else {
      this.selectedFile = undefined;
      this.formData.get('file')?.setValue(null);
    }
  }

  fileValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const file = control.value as File;
    if (!file) return null;

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
}
