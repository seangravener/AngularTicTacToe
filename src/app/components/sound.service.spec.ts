import { TestBed } from '@angular/core/testing';

import { SoundServiceTsService } from './sound.service';

describe('SoundServiceTsService', () => {
  let service: SoundServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
