export default function (size) { // in bytes
  const buffer = new ArrayBuffer(size);
  const dv = new DataView(buffer);

  return dv;
}
