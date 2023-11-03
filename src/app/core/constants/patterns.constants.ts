import { Injectable } from '@angular/core';

@Injectable()
export class PatternsConstants {
  static readonly PATTERN_EMAIL = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  static readonly PATTERN_PASSWORD =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
  static readonly PATTERN_FIRST_NAME = /^([A-Za-z`'-]+){3,30}$/;
  static readonly PATTERN_LAST_NAME = /^([A-Za-z`'-]+){3,50}$/;
}
