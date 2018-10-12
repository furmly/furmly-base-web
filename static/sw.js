self.importScripts("index.js");
const process = exports.getProcess();
process.steps.push(exports.getStep());
process.steps[0].form.elements.push(exports.getSimpleGrid());
const matches = [
  { pattern: /describe\/59bf14940774e451fcd2f0df/, response: process }
];

self.addEventListener("fetch", event => {
  console.log(event.request);

  for (let i = 0; i < matches.length; i += 1) {
    if (matches[i].pattern.exec(event.request.url)) {
      return event.respondWith(
        Promise.resolve(new Response(matches[i].response, { status: 202 }))
      );
    }
  }
  fetch(event.request);
  //event.respondWith(Promise.resolve(new Response({}, { status: 202 })));
});
