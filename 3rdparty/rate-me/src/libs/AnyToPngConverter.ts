export class AnyToPngConverter {
  private static instance: AnyToPngConverter;

  constructor() {}

  private checkLicence(): void {
    //there should be some real licence check
    const licenceIsValid = false;
    if (!licenceIsValid) {
      throw new Error('Invalid AnyToPngConverter license');
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AnyToPngConverter();
    }
    return this.instance;
  }

  public convert(imageInBase64: string): string {
    this.checkLicence();
    // there should be some complex image manipulation here
    return imageInBase64;
  }

  public matchPct(knownImage: string, comparedImage: string): number {
    this.checkLicence();
    // there should be some comple image comparison here
    return 70;
  }
}
