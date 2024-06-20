import { CrazyDniNie } from '../../libs/CrazyDniNie';
import { DocumentIdContentExtractorOcrAwesome } from './DocumentIdContentExtractorOcrAwesome';

export class DocumentIdContentExtractorChained
  implements DocumentIdContentExtractor
{
  constructor(
    private newLib: CrazyDniNie,
    private lib: DocumentIdContentExtractorOcrAwesome,
  ) {}

  extractContentFromDocumentImages(front: string, back: string) {
    // con la libreria nueva se obtiene el tipo de documento
    const documentType = this.newLib.inferDocumentType(front);

    // si lo reconoce ejecutar libreria nueva
    if (documentType) {
      const data = this.newLib.captureData(front, back);
      const newData = {
        ...data,
        fechaDeNacimiento: data.fechaDeNacimiento
          .toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-'),
      };
      return newData;
    }

    // si no lo reconoce ejecutar libreria antigua
    return this.lib.extractContentFromDocumentImages(front, back);
  }
}
