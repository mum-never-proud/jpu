export default function createRegisterMap(registers) {
  return registers.reduce((map, name, idx) => {
    // eslint-disable-next-line no-param-reassign
    map[name] = idx * 2;

    return map;
  }, {});
}
