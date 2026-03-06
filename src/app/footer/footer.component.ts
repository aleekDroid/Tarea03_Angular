import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}