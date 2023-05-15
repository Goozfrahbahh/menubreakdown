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
   * @desc      Get all MenuItem = menuitems from the db
   * @returns   Observable
   */
  getMenuItems(): Observable<any> {
    return this.http.get(this.apiUrl, httpOptions).pipe(
      tap((response) => this.log('Retreival of Menu Items Succeeded from API')),
      catchError(this.handleError('getmenuitems'))
    );
  }
  /**
   * @desc      Add a new menubreakdown to the db
   * @param     menuitem    Single row object to type of MenuItem
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

  /**
   * @desc      Update an existing menuitem
   * @param     menuitemId      Master Id of the Menu Item
   */
  async updateMenuItem(menuitemId: number, menuitem: MenuItem): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from('menuitems')
      .update(menuitem)
      .match({ masterId: menuitemId });

    if (data) {
      this.log(`Update Event: ${menuitemId}`);
      return data;
    }
    if (error) {
      this.log(error.message);
      return error.message;
    }
  }

  /**
   * @desc      Delete an existing Menu Item
   * @param
   * @param     menuitemId           Master Id of the Menu Item
   */
  async deleteMenuItem(menuitemId: number): Promise<any> {
    const { data, error } = await this.supabaseClient
      .from('menuitems')
      .delete()
      .match({ id: menuitemId });

    if (data) {
      this.log(`Delete Event: ${menuitemId}`);
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
