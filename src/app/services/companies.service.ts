import { Injectable } from '@angular/core';
import { Observable, delay, map, of, tap } from 'rxjs';
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
    ]).pipe(delay(2000), map(this.mapDataInCorrectFormat), tap(console.log));
  }

  private mapDataInCorrectFormat(data: DataItems[]): Items[] {
    const result: Items[] = [];

    data.forEach((item) => {
      const itemNames = item.name.split(' / ');

      let currentItem = result.find((r) => r.name === itemNames[0]);

      if (!currentItem) {
        currentItem = {
          name: itemNames[0],
          items: [],
        };
        result.push(currentItem);
      }

      let currentArray = currentItem.items as Items[];

      for (let i = 1; i < itemNames.length - 1; i++) {
        const itemName = itemNames[i];
        let nestedItem = currentArray.find((x) => x.name === itemName);

        if (!nestedItem) {
          nestedItem = {
            name: itemName,
            items: [],
          };
          currentArray.push(nestedItem);
        }

        currentArray = nestedItem.items as Items[];
      }

      currentArray.push({
        id: item.id,
        name: itemNames[itemNames.length - 1],
      });
    });

    return result;
  }
}
