
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

 private http = inject(HttpClient);

  searchUsers(username: string): Observable<GithubUser[]> {
    const headers = new HttpHeaders().set('Authorization', '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');
    return this.http.get<GithubUser[]>(`https://api.github.com/search/users?q=${username}`,{headers}).pipe(
      map((res: any) => res.items)
    );
  }
}
