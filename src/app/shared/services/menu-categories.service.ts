import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { DailyMenuBreakdown } from '../models/menubreakdown';

export const MENUCATEGORIES_TABLE = 'menucategories';

@Injectable({ providedIn: 'root' })
export class MenuBreakdownService {
  projectUrl = 'https://hjxygqmxqkuxgehnewpy.supabase.co';

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
  async getMenuSchema(): Promise<any> {
    console.log('lol');
    const menucategories = await this.supabaseClient
      .from(MENUCATEGORIES_TABLE)
      .select('*');
    this.log(JSON.stringify(menucategories));
    return menucategories.data || [];
  }
  /**
   * @desc      Add a new menubreakdown to the db
   * @param     InventoryData    Single row object to type of MenuBreakdown
   * @returns   Promise (data or error)
   */

  async addMenuCategory(menubreakdown: DailyMenuBreakdown): Promise<any> {
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

  private log(message: string) {
    this.message.add(message);
  }
}
