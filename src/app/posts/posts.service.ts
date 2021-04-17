import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  ghostApi: string;
  ghostToken: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.ghostApi = this.configService.get('GHOST_URI')
    this.ghostToken = this.configService.get('GHOST_TOKEN')
  }

  findAll(): Observable<AxiosResponse> {
    return this.httpService
      .get(
        `${this.ghostApi}/content/posts/?key=${this.ghostToken}&include=tags,authors`,
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
