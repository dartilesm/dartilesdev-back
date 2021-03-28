import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  ghostApi = 'https://dartilesdev.herokuapp.com/ghost/api/v3';
  constructor(private httpService: HttpService) {}

  findAll(): Observable<AxiosResponse> {
    return this.httpService
      .get(
        `${this.ghostApi}/content/posts/?key=954ab9b544ac9095c070e44c63&include=tags,authors`,
      )
      .pipe(
        map((response) =>
          response.data.posts.map((post) => ({
            ...post,
            title: post.title,
            html: post.html,
            slug: post.slug,
            createdAt: post.created_at,
            id: post.id,
            desc: post.excerpt,
          })),
        ),
      );
  }
}
