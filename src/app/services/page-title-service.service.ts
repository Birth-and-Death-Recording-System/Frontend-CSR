import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ActivationEnd, Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  constructor(private titleService: Title, private router: Router) {
    this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      map((event: ActivationEnd) => {
        let snapshot: ActivatedRouteSnapshot = event.snapshot;
        while (snapshot.firstChild) {
          snapshot = snapshot.firstChild;
        }
        return snapshot.data['title'];
      })
    ).subscribe((title: string) => {
      this.setTitle(title || 'Default Title');
    });
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
