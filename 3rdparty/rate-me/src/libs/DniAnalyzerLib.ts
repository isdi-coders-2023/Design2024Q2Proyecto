import { AnyToPngConverter } from './AnyToPngConverter';

export class DniAnalyzerLib {
  public static FRONT_DNI_PATTERN = 'some-base-DNI-image-in-base-64';
  public static BACK_DNI_PATTERN = 'some-base-DNI-image-in-base-64';

  private pngConverter: AnyToPngConverter;
  //private ocrHelper: OcrAwesomeLib;
  private contentExtractor: DocumentIdContentExtractor;

  constructor(pngConverter: AnyToPngConverter, contentExtractor: DocumentIdContentExtractor) {
    this.pngConverter = pngConverter;
    //this.ocrHelper = new OcrAwesomeLib();
    this.contentExtractor = contentExtractor;
  }

  public extractContentFromDNI(front: string, back: string): any {
    return this.contentExtractor.extractContentFromDocumentImages(front, back);
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
