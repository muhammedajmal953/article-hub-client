import { Component } from '@angular/core';
import { AddArticleComponent } from "../../components/add-article/add-article.component";

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [AddArticleComponent],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.css'
})
export class AddContentComponent {

}
