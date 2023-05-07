import { Component } from '@angular/core';
import { Profile } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-container absolute bottom-1 right-1">
      <div class="profile-header">
        <h2>goozfrahbah</h2>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  profile: Profile;

  private destroy$ = new Subject<void>();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((profile: any) => {
        if (profile) {
          this.profile = profile;
        }
      });
  }
}
