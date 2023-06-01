import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from 'src/app/shared/company/company.component';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CompanyComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  companies$ = inject(CompaniesService).getCompanies();

}
