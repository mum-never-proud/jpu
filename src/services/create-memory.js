export default function createMemory(size) { // in bytes
  const buffer = new ArrayBuffer(size);
  const dv = new DataView(buffer);

  return dv;
}
