'use strict';

async function readFile(fileName) {
  const input = await fetch(fileName);
  const text = await input.text();
  return text;
}

function findMarkerPosition(dataStream, markerLength) {
  for (let i = 0; i < dataStream.length - markerLength; i++) {
    const marker = dataStream.slice(i, i + markerLength);
    if ([...new Set(marker.split(''))].length == markerLength) {
      return dataStream.indexOf(marker) + markerLength;
    }
  }
}

readFile('input.txt').then((text) => {
  console.log(findMarkerPosition(text, 4));
  console.log(findMarkerPosition(text, 14));
});
