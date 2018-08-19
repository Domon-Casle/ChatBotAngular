import { TestBed, inject } from '@angular/core/testing';

import { LuisaiService } from './luisai.service';

describe('LuisaiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuisaiService]
    });
  });

  it('should be created', inject([LuisaiService], (service: LuisaiService) => {
    expect(service).toBeTruthy();
  }));
});
