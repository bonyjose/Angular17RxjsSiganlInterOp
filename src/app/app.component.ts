import { Component, effect, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { pipe, filter, switchMap, tap } from 'rxjs';
import { GithubService } from './services/github.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RxjsInterOp';
  private ghService = inject(GithubService);
  loading = false;
  inputChange = signal('');
  ghUsers = toSignal(
    toObservable(this.inputChange).pipe(
      filter((input: string) => input.length > 3),
      tap(() => (this.loading = true)),
      switchMap((input: string) => this.ghService.searchUsers(input)),
      tap(() => (this.loading = false))
    )
  );

  logEffect = effect(() =>
    console.log(this.ghUsers())
  );

  handleChange(event: any) {
    this.inputChange.set(event.target.value);
  }

}
