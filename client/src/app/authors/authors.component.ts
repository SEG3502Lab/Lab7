import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AuthorsComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  submit(value: string): void {
    const id = value.trim();
    if (id) {
      this.router.navigate(['./', id], {relativeTo: this.route}).then(r => {});
    }
  }
}
