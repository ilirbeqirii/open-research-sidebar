import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { DataItems } from '../models/data-items';
import { Items } from '../models/items';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor() {}

  getCompanies(): Observable<Items[]> {
    return of([
      { id: '1', name: 'Ravvivo / Finance Team / Michael P. Lucifer' },
      { id: '2', name: 'Ravvivo / Technical Team / Marlyn B. Brown' },
      { id: '3', name: 'Ravvivo / Technical Team / David P. Perez' },
      { id: '4', name: 'CashLab / Anna J. Kelley' },
      { id: '5', name: 'CashLab / Brenda J. Soto' },
      { id: '6', name: 'Dovish / Management / Timothy A. Merrow' },
    ]).pipe(delay(2000), map(this.mapDataInCorrectFormat));
  }

  private mapDataInCorrectFormat(data: DataItems[]): Items[] {
    const result: Items[] = [];

    data.forEach((item) => {
      const itemNames = item.name.split(' / ');
      let currentItem = null;
      let currentArray = result;

      itemNames.forEach((name, index) => {
        const existingItem = currentArray.find((x) => x.name === name);

        if (existingItem) {
          currentItem = existingItem;
          currentArray = currentItem.items as Items[];
        } else {
          const newItem = {
            name,
            items: [],
          };

          currentArray.push(newItem);
          currentItem = newItem;
          currentArray = newItem.items;
        }

        if (index === itemNames.length - 1) {
          currentArray.push({
            id: item.id,
            name: itemNames[itemNames.length - 1],
          });
        }
      });
    });

    return result;
  }
}
