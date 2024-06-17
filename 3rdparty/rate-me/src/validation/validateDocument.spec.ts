import { ValidateDocument } from './validateDocument';

const samplePayload = {
  dni: '44852154Z',
  nombre: 'Lucas',
  apellidos: 'Mateo Rufián',
  fechaNacimiento: '11-12-1976',
  frontImage: 'base64-jpeg',
  backImage: 'another-base64-jpeg',
};

const sut: ValidateDocument = new ValidateDocument();

describe('validateDocument', () => {
  describe('when validating post data', () => {
    it('should fail if dni is not present', () => {
      const payload = { ...samplePayload };
      delete payload.dni;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if nombre is not present', () => {
      const payload = { ...samplePayload };
      delete payload.nombre;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if fechaNacimiento is not present', () => {
      const payload = { ...samplePayload };
      delete payload.fechaNacimiento;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should fail if apellidos is not present', () => {
      const payload = { ...samplePayload };
      delete payload.apellidos;
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

    it('should fail if backImage is not present', () => {
      const payload = { ...samplePayload };
      delete payload.backImage;
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid data received');
    });

    it('should accept valid payload', () => {
      const payload = { ...samplePayload };
      expect(() => {
        sut.validate(payload);
      }).toThrow('Invalid AnyToPngConverter license');
    });
  });
});
