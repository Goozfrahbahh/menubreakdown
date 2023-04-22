import { Observable } from 'rxjs';
import {
  CanDeactivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TableComponent } from '../../view/components/table-main/table/table.component';

export const canDeactivateGuard: CanDeactivateFn<TableComponent> = (
  component: TableComponent,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean => {
  // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged

  // Otherwise ask the user with the dialog service and return its
  // observable which resolves to true or false when the user decides
  return component.canDeactivate();
};
