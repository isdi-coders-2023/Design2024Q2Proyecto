import { isValidDocumentDto } from '../types/types.guards';
import { AnyToPngConverter } from '../libs/AnyToPngConverter';
import { DniAnalyzerLib } from '../libs/DniAnalyzerLib';
import { ValidateDniImages } from './validateDniImages.service';
import { DocumentIdContentExtractorChained } from './infrastructure/DocumentIdContentExtractorChained';
import { CrazyDniNie } from '../libs/CrazyDniNie';
import { DocumentIdContentExtractorOcrAwesome } from './infrastructure/DocumentIdContentExtractorOcrAwesome';

export class ValidateDocument {
  private dniAnalyzer: DniAnalyzerLib;
  private _documentIdContentExtractor: DocumentIdContentExtractor;

  constructor(
    pngConverter: AnyToPngConverter,
    private validateDniImages: ValidateDniImages,
  ) {
    const newLib = new CrazyDniNie();
    const lib = new DocumentIdContentExtractorOcrAwesome(pngConverter);

    const documentIdContentExtractor: DocumentIdContentExtractor =
      new DocumentIdContentExtractorChained(newLib, lib);

    this._documentIdContentExtractor = documentIdContentExtractor;

    this.dniAnalyzer = validateDniImages.dniAnalyzer;
  }
  //NOTE siempre recibimos las imágenes como jpeg
  public validate(data: any): void {
    if (!isValidDocumentDto(data)) {
      throw new Error('Invalid data received');
    }

    if (this.validateDniImages.areImagesFake(data.frontImage, data.backImage)) {
      throw new Error('Las imágenes parecen falsas');
    }

    // usar la librería para extraer datos del DNI
    const dataExtracted =
      this._documentIdContentExtractor.extractContentFromDocumentImages(
        data.frontImage,
        data.backImage,
      );

    // comparar los datos de la librería con los que recibimos
    if (data.name === dataExtracted.nombre) {
      if (data.surname === dataExtracted.apellidos) {
        if (data.documentId === dataExtracted.dni) {
          if (
            data.birthday ===
            dataExtracted.fechaDeNacimiento.replaceAll(' ', '-')
          ) {
            return;
          }
        }
      }
    }

    throw new Error('Algún dato no casa con el DNI');
  }
}
