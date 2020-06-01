import JPU from '../src/jpu';

describe('JPU', () => {
  let jpu;

  beforeEach(() => {
    jpu = new JPU(JPU.createMemory(256));
  });

  afterEach(() => {
    jpu = undefined;
  });

  it('should throw error is memory is not ArrayBuffer', () => {
    expect(() => new JPU(1234)).toThrowError(Error);
  });

  it('should create memory double the number of register', () => { // each register is 2 bytes (16 bits)
    expect(jpu.registers.byteLength).toEqual(Object.keys(jpu.registerMap).length * 2);
  });

  it('should get register by name', () => {
    expect(jpu.getRegister('ip')).not.toBeUndefined();
  });

  it('should throw error when invalid register is supplied for getRegister', () => {
    expect(() => jpu.getRegister('ipman')).toThrowError(Error);
  });

  it('should get register value by name', () => {
    jpu.setRegister('ip', 1);

    expect(jpu.getRegister('ip')).toEqual(1);
  });

  it('should throw error when invalid register is supplied for setRegister', () => {
    expect(() => jpu.setRegister('ipman', 0)).toThrowError(Error);
  });

  it('should get offset of register', () => { // each register is 2 bytes (16 bits)
    // register index should give the offset in registers memory
    expect(jpu.getRegisterOffset(2)).toEqual(jpu.registerMap.r1);
  });

  it('should increase ip by 1 for fetch', () => {
    jpu.fetch();

    expect(jpu.getRegister('ip')).toEqual(1);
  });

  it('should increase ip by 2 for fetch16', () => {
    jpu.fetch16();

    expect(jpu.getRegister('ip')).toEqual(2);
  });
});
