import { ElementRefDirective } from './element-ref.directive';

describe('ViewInitiatedDirective', () => {
  it('should create an instance', () => {
    const directive = new ElementRefDirective();
    expect(directive).toBeTruthy();
  });
});
