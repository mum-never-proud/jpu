export default function (registers) {
  return registers.reduce((map, name, idx) => {
    map[name] = idx * 2;

    return map;
  }, {});
}
