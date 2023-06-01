import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent {

  @Input()
  company: Items | undefined;

}
