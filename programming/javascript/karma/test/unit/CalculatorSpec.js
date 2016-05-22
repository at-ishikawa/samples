describe('Calculator', function() {

  beforeEach(function() {
    // console.log('beforeEach');
  });

  afterEach(function() {
    // console.log('afterEach');
  });

  it('should return 3 for 1 + 2', function() {
    expect(window.Calculator.add(1, 2)).toBe(3);
  });
});
