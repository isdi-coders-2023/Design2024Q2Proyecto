import { AnyToPngConverter } from '../../libs/AnyToPngConverter';
import { DniAnalyzerLib } from '../../libs/DniAnalyzerLib';
import { OcrAwesomeLib } from '../../libs/OcrAwesomeLib';

export class DocumentIdContentExtractorOcrAwesome
  implements DocumentIdContentExtractor
{
  private ocrAwesome: OcrAwesomeLib;

  constructor(private pngConverter: AnyToPngConverter) {
    this.ocrAwesome = new OcrAwesomeLib();
  }

  extractContentFromDocumentImages(front: string, back: string) {
    const frontAsPng = this.pngConverter.convert(front);
    return this.ocrAwesome.extractText(
      frontAsPng,
      17.12,
      33,
      true,
      true,
      DniAnalyzerLib.FRONT_DNI_PATTERN,
    );
  }
}
