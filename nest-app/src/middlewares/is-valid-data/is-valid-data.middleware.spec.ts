import { IsValidDataMiddleware } from './is-valid-data.middleware';

describe('IsValidDataMiddleware', () => {
  it('should be defined', () => {
    expect(new IsValidDataMiddleware()).toBeDefined();
  });
});
