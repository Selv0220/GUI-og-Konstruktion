import { TestBed } from '@angular/core/testing';

import { MySqlServiceService } from './my-sql-service.service';

describe('MySqlServiceService', () => {
  let service: MySqlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySqlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
