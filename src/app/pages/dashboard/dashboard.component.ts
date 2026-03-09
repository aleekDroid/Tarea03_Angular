import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any

  statusChart: any
  priorityChart: any
  weeklyChart: any
  groupChart: any

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    this.stats = this.dashboardService.getStats()

    this.statusChart = this.dashboardService.ticketsByStatus()

    this.priorityChart = this.dashboardService.ticketsByPriority()

    this.weeklyChart = this.dashboardService.weeklyActivity()

    this.groupChart = this.dashboardService.ticketsByGroup()

  }

chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
  layout: {
    padding: 10
  }
}

}