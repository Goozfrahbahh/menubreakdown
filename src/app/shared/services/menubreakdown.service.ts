import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { DailyMenuBreakdown } from '../models/menubreakdown';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    apiKey: `${environment.supabaseKey}`,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  }),
};
export const MENUBREAKDOWN_TABLE = 'menubreakdowns';

@Injectable({ providedIn: 'root' })
export class MenuBreakdownService {
  projectUrl = 'https://hjxygqmxqkuxgehnewpy.supabase.co';
  apiUrl = 'https://hjxygqmxqkuxgehnewpy.supabase.co/rest/v1/menubreakdowns';

  private supabaseClient!: any;
  constructor(private message: MessageService, private http: HttpClient) {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  /** TYPICAL HTTP ROUTE
   * @desc      Get all books from the db
   * @returns   Observable
   *
   */
  getMenuBreakdowns() {
    return this.http.get(this.apiUrl, httpOptions).pipe(
      tap((response) => this.log(`${response}`)),
      catchError(this.handleError('GetMenubreakdowns'))
    );
  }
  /**
   * @desc      Add a new menubreakdown to the db
   * @param     InventoryData    Single row object to type of MenuBreakdown
   * @returns   Promise (data or error)
   */
  async addMenuBreakdown(menubreakdown: DailyMenuBreakdown): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from('menubreakdowns')
      .insert([
        {
          id: menubreakdown.id,
          date: menubreakdown.date,
          totals: menubreakdown.totals,
        },
      ]);
    const menudata = menubreakdown;
    if (data) {
      this.log(`Successful uploaded ${menudata}`);
      return data;
    }
    if (error) {
      this.log(`Failed uploaded ${error} for menu ${menudata.id}`);
      return error.message;
    }
  }

  /**
   * @desc      Update a book
   * @param     totalId      ID of book to update
   */
  async updateMenuBreawkdown(
    menubreakdownId: number,
    menubreakdown: DailyMenuBreakdown
  ): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from('menubreakdowns')
      .update(menubreakdown)
      .match({ id: menubreakdownId });

    if (data) {
      this.log(`Update Event: ${menubreakdownId}`);
      return data;
    }
    if (error) {
      this.log(error.message);
      return error.message;
    }
  }

  /**
   * @desc      Delete a book
   * @param     totalId      ID of book to delete
   */
  async deleteMenuBreakdown(menubreakdownId: number): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from('menubreakdowns')
      .delete()
      .match({ id: menubreakdownId });

    if (data) {
      this.log(`Delete Event: ${menubreakdownId}`);
      return data;
    }
    if (error) {
      this.log(error.message);
      return error.message;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(error.message);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.message.add(message);
  }
}
