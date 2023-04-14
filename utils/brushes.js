class Lines {
  constructor(ctx) {
    this.ctx = ctx;
    this.patterns = [
      [], // solid
      [2, 2], // .....
      [10, 10], // --  --  --
      [20, 5], // --- --- ---
      [15, 3, 3, 3], // --- . --- . ---
      [20, 3, 3, 3, 3, 3, 3, 3], // ---- ... ---- ... ----
    ];
  }

  dash(patternId) {
    if (patternId < 0 || patternId > this.patterns.length - 1) {
      throw new Error("Invalid line pattern ID.");
    }
    this.ctx.setLineDash(this.patterns[patternId]);
  }

  random_dash() {
    this.ctx.setLineDash(R.random_choice(this.patterns));
  }
}
