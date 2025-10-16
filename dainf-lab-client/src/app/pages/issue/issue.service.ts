import { CrudService } from '@/shared/crud/crud.service';
import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable()
export class IssueService extends CrudService<Issue> {
  constructor() {
    super('issues');
  }
}