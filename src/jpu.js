import {
  MOV_LIT_REG,
  MOV_REG_REG,
  MOV_MEM_REG,
  MOV_REG_MEM,
  ADD_REG_REG,
} from './constants/instructions';
import createMemory from './services/create-memory';
import createRegisterMap from './utils/create-register-map';
import registerNames from './constants/registers';

class JPU {
  constructor(memory) {
    if (!(memory instanceof DataView)) {
      throw Error('memory should be an instance of DataView, make use of JPU.createMemory(sizeInBytes)');
    }

    this.memory = memory;
    this.resetRegisters();
  }

  getRegister(name) {
    if (Object.prototype.hasOwnProperty.call(this.registerMap, name)) {
      return this.registers.getUint16(this.registerMap[name]);
    }

    throw Error('register not found');
  }

  // eslint-disable-next-line class-methods-use-this
  getRegisterOffset(idx) {
    return (idx % registerNames.length) * 2;
  }

  setRegister(name, value) {
    if (Object.prototype.hasOwnProperty.call(this.registerMap, name)) {
      return this.registers.setUint16(this.registerMap[name], value);
    }

    throw Error('register not found');
  }

  fetch() {
    const nextInstructionAddress = this.getRegister('ip');
    const nextInstruction = this.memory.getUint8(nextInstructionAddress);

    this.setRegister('ip', nextInstructionAddress + 1);

    return nextInstruction;
  }

  fetch16() {
    const nextInstructionAddress = this.getRegister('ip');
    const nextInstruction = this.memory.getUint16(nextInstructionAddress);

    this.setRegister('ip', nextInstructionAddress + 2);

    return nextInstruction;
  }

  viewRegisters() {
    return registerNames.map((name) => `${name}\t\t\t${this.registers.getUint16(this.registerMap[name])}`).join('\n');
  }

  viewMemoryAt(addr) {
    const eightBytes = Array.from({ length: 8 }, (_, i) => this.memory.getUint8(addr + i))
      .map((v) => `0x${v.toString(16).padStart(2, '0')}`)
      .join(' ');

    return `0x${addr.toString(16).padStart(4, '0')} : ${eightBytes}`;
  }

  resetRegisters() {
    this.registers = createMemory(registerNames.length * 2);
    this.registerMap = createRegisterMap(registerNames);
  }

  execute(instruction) {
    switch (instruction) {
      // memory
      case MOV_LIT_REG: {
        const value = this.fetch16();
        const register = this.getRegisterOffset(this.fetch());

        this.registers.setUint16(register, value);

        return;
      }

      case MOV_REG_REG: {
        const fromRegister = this.getRegisterOffset(this.fetch());
        const toRegister = this.getRegisterOffset(this.fetch());
        const value = this.registers.getUint16(fromRegister);

        this.registers.setUint16(toRegister, value);

        return;
      }

      case MOV_MEM_REG: {
        const fromMemory = this.fetch16();
        const toRegister = this.getRegisterOffset(this.fetch());
        const value = this.memory.getUint16(fromMemory);

        this.registers.setUint16(toRegister, value);

        return;
      }

      case MOV_REG_MEM: {
        const fromReg = this.getRegisterOffset(this.fetch());
        const toMemory = this.fetch16();
        const value = this.registers.getUint16(fromReg);

        this.memory.setUint16(toMemory, value);

        return;
      }
      // arithmetic
      case ADD_REG_REG: {
        const register1 = this.getRegisterOffset(this.fetch());
        const register2 = this.getRegisterOffset(this.fetch());
        const value1 = this.registers.getUint16(register1);
        const value2 = this.registers.getUint16(register2);

        this.setRegister('acc', value1 + value2);
      }

      // no default
    }
  }

  step() {
    this.execute(this.fetch());

    return this;
  }

  static createMemory(size) {
    return createMemory(size);
  }
}

module.exports = JPU;
