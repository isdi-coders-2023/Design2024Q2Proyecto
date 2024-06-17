import { AnyToPngConverter } from './AnyToPngConverter';
import { OcrAwesomeLib } from './OcrAwesomeLib';

export class DniAnalyzerLib {
  private static FRONT_DNI_PATTERN = 'some-base-DNI-image-in-base-64';
  private static BACK_DNI_PATTERN = 'some-base-DNI-image-in-base-64';

  private pngConverter: AnyToPngConverter;
  private ocrHelper: OcrAwesomeLib;

  constructor() {
    this.pngConverter = new AnyToPngConverter();
    this.ocrHelper = new OcrAwesomeLib();
  }

  public extractContentFromDNI(front: string, back: string): any {
    // retorna el contenido del DNI después de pasarle un OCR
    const frontAsPng = this.pngConverter.convert(front);
    return this.ocrHelper.extractText(
      frontAsPng,
      17.12,
      33,
      true,
      true,
      DniAnalyzerLib.FRONT_DNI_PATTERN,
    );
  }

  public validateDNI(front: string, back: string): number {
    //analiza el DNI y responde en qué porcentaje parece válido
    const frontAsPng = this.pngConverter.convert(front);
    const backAsPng = this.pngConverter.convert(back);

    const frontVeracity = this.pngConverter.matchPct(
      DniAnalyzerLib.FRONT_DNI_PATTERN,
      frontAsPng,
    );
    const backVeracity = this.pngConverter.matchPct(
      DniAnalyzerLib.BACK_DNI_PATTERN,
      backAsPng,
    );

    return (frontVeracity + backVeracity) / 2;
  }
}
