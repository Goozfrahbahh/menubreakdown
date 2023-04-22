import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messages.service';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import { DailyMenuBreakdown } from '../models/menubreakdown';

export const MENUBREAKDOWN_TABLE = 'menubreakdowns';

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
   * @desc      Get all books from the db
   * @returns   Observable
   */
  async getMenuBreakdowns(): Promise<any> {
    const menubreakdowns = await this.supabaseClient
      .from(MENUBREAKDOWN_TABLE)
      .select('*');
    this.log(JSON.stringify(menubreakdowns));
    return menubreakdowns.data || [];
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
    if (data) {
      return data;
    }
    if (error) {
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
