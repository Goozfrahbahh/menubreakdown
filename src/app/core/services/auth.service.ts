import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  createClient,
  RealtimeChannel,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, first, skipWhile } from 'rxjs';
import { Router } from '@angular/router';
import { Profile } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Set up Supabase Client
  private supabase: SupabaseClient;

  // Set up User Subject and Observable
  protected userSubject: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject<boolean | User | any>(null);
  user$ = this.userSubject.pipe(
    skipWhile((_) => typeof _ === 'undefined')
  ) as Observable<User | null>;
  private id?: string;

  private profileSubject: BehaviorSubject<Profile | null | undefined> =
    new BehaviorSubject<Profile | null | undefined>(undefined);

  // Set up profile Subject and Observable
  profile$ = this.profileSubject.pipe(
    skipWhile((_) => typeof _ === 'undefined')
  ) as Observable<Profile | null>;
  private profileSubscription: RealtimeChannel;

  constructor(supabase: SupabaseClient, private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.getUser().then(({ data, error }) => {
      this.userSubject.next(data && data.user && !error ? data.user : null);
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.userSubject.next(session?.user ?? null);
    });

    this.user$.subscribe((user) => {
      if (user) {
        if (user.id !== this.id) {
          const user_id = user.id;
          this.id = user_id;
          this.supabase
            .from('profiles')
            .select('*')
            .match({ user_id })
            .single()
            .then((res: any) => {
              this.profileSubject.next(res.data ?? null);
            });

          this.profileSubscription = this.supabase
            .channel('public:profiles')
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'profiles',
                filter: 'user_id=eq.' + user_id,
              },
              (payload: any) => {
                this.profileSubject.next(payload.new);
              }
            )
            .subscribe();
        }
      } else {
        this.profileSubject.next(null);
        delete this.id;
        if (this.profileSubscription) {
          this.supabase.removeChannel(this.profileSubscription).then((res) => {
            console.log(
              'Removed profile channel subscription with status: ' + res
            );
          });
        }
      }
    });
  }

  signIn(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.profileSubject.next(undefined);
      this.supabase.auth
        .signInWithPassword({ email, password })
        .then(({ data, error }) => {
          if (error || !data) reject('Invalid Email/Password Combination');

          this.profile$.pipe(first()).subscribe(() => {
            resolve();
          });
        });
    });
  }

  signUp(profile: Profile) {}

  logout() {
    return this.supabase.auth.signOut();
  }
}
