import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { DailyMenuBreakdown, MenuItem } from '../models/menubreakdown';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    apiKey: `${environment.supabaseKey}`,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  }),
};
export const MENUITEMS_TABLE = 'menuitems';

@Injectable({ providedIn: 'root' })
export class MenuItemsService {
  projectUrl = 'https://hjxygqmxqkuxgehnewpy.supabase.co';
  apiUrl = 'https://hjxygqmxqkuxgehnewpy.supabase.co/rest/v1/menuitems';

  private supabaseClient!: any;
  constructor(private message: MessageService, private http: HttpClient) {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  /** TYPICAL HTTP ROUTE
   * @desc      Get all categories and menuitems from the db
   * @returns   Observable
   */
  getMenuItems(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions).pipe(
      tap((response) => this.log(`${response}`)),
      catchError(this.handleError('getmenuitems'))
    );
  }
  /**
   * @desc      Add a new menubreakdown to the db
   * @param     InventoryData    Single row object to type of MenuBreakdown
   * @returns   Promise (data or error)
   */

  async addMenuItem(menuitem: MenuItem): Promise<any> {
    const { data, error } = await this.supabaseClient.from('menuitems').insert([
      {
        masterId: Number(menuitem.masterId),
        group: menuitem.group,
        name: menuitem.name,
        description: menuitem.description,
        categories: menuitem.categories ? menuitem.categories : '',
        imageUrl: menuitem.imageUrl ? menuitem.imageUrl : '',
      },
    ]);
    const menudata = menuitem;
    if (data) {
      this.log(`Successful uploaded ${menudata}`);
      return data;
    }
    if (error) {
      this.log(`Failed uploaded ${error} for menu ${menudata.masterId}`);
      return error.message;
    }
  }
  async addItemToMenuCategory(menubreakdown: DailyMenuBreakdown): Promise<any> {
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
