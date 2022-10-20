import { TestBed } from '@angular/core/testing';

import { ProductscategoryService } from './productscategory.service';

describe('ProductscategoryService', () => {
  let service: ProductscategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductscategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
