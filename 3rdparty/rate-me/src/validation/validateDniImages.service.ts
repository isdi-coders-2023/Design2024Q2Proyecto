import { DniAnalyzerLib } from '../libs/DniAnalyzerLib';

export class ValidateDniImages {
  public static MIN_RATE = 50;

  constructor(public dniAnalyzer: DniAnalyzerLib) {}

  public areImagesFake(frontImage: string, backImage: string) {
    const rate = this.dniAnalyzer.validateDNI(frontImage, backImage);

    return rate < ValidateDniImages.MIN_RATE;
  }
}
