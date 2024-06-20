import { AnyToPngConverterTesteable } from '../libs/AnyToPngConverterTesteable';
import { DniAnalyzerLib } from '../libs/DniAnalyzerLib';
import { ValidateDniImages } from './validateDniImages.service';
import { ValidateDocument } from './validateDocument';

const samplePayload = {
  documentId: '44852154Z',
  name: 'Lucas',
  surname: 'Mateo Rufián',
  birthday: '11-12-1976',
  frontImage: 'base64-jpeg',
  backImage: 'another-base64-jpeg',
};

const pngConverter = new AnyToPngConverterTesteable();
let documentContentExtractor: DocumentIdContentExtractor;
let dniAnalyzer;
let validateDniImages;

let sut: ValidateDocument;

describe('validateDocument', () => {
  beforeEach(() => {
    documentContentExtractor = {
      extractContentFromDocumentImages: jest.fn(),
    };
    dniAnalyzer = new DniAnalyzerLib(pngConverter, documentContentExtractor);
    validateDniImages = new ValidateDniImages(dniAnalyzer);

    sut = new ValidateDocument(pngConverter, validateDniImages);
  });

  describe('when validating post data', () => {
    it('should validate document', () => {
      const payload = { ...samplePayload };
      documentContentExtractor.extractContentFromDocumentImages = () => {
        return {
          nombre: samplePayload.name,
          apellidos: samplePayload.surname,
          dni: samplePayload.documentId,
          fechaDeNacimiento: samplePayload.birthday,
        };
      };

      sut.validate(payload);
    });

    it('should fail if dni is not present', () => {
      const payload = { ...samplePayload };
      delete payload.documentId;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if nombre is not present', () => {
      const payload = { ...samplePayload };
      delete payload.name;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if fechaNacimiento is not present', () => {
      const payload = { ...samplePayload };
      delete payload.birthday;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if apellidos is not present', () => {
      const payload = { ...samplePayload };
      delete payload.surname;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if frontImage is not present', () => {
      const payload = { ...samplePayload };
      delete payload.frontImage;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if backImage is not present', () => {
      const payload = { ...samplePayload };
      delete payload.backImage;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should evalueate images as fake', () => {
      const payload = {
        ...samplePayload,
        frontImage: 'fake-image',
        backImage: 'fake-image',
      };

      expect(() => {
        sut.validate(payload);
      }).toThrow('Las imágenes parecen falsas');
    });

    it('should fail if some data does not match with payload', () => {
      const payload = { ...samplePayload, frontImage: 'fake-image-2' };
      documentContentExtractor.extractContentFromDocumentImages = () => {
        return {
          nombre: 'el-nombre-es-diferente',
          apellidos: samplePayload.surname,
          dni: samplePayload.documentId,
          fechaDeNacimiento: samplePayload.birthday,
        };
      };
      expect(() => {
        sut.validate(payload);
      }).toThrow('Algún dato no casa con el DNI');
    });
  });
});
