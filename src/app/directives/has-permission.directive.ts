// src/app/directives/has-permission.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true 
})
export class HasPermissionDirective {
  private currentPermission = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set appHasPermission(permission: string) {
    this.currentPermission = permission;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear(); 
    
    // Si tiene el permiso, se muestra en el DOM.
    if (this.authService.hasPermission(this.currentPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}