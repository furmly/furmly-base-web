const matches = [
  { pattern: /describe\/59bf14940774e451fcd2f0df/, url: "/grid.json" },
  { pattern: /59c027fdf0c3e43dcc70c4dd/, url: "/select.json" },
  { pattern: /59bf231a3315c24ef080d369/, url: "/grid-source.json" },
  { pattern: /59bfb357fb766f1ff0c2adc0/, url: "/add-template.json" },
  { pattern: /section-width-data/, url: "/section-with-data.json" },
  { pattern: /section/, url: "/section.json" },
  { pattern: /actionview/, url: "/actionview.json" },
  { pattern: /save_processor/, url: "/save_processor.json" },
  { pattern: /webview/, url: "/webview.json" },
  { pattern: /htmlview/, url: "/htmlview.json" },
  { pattern: /label/, url: "/label.json" },
  { pattern: /image/, url: "/image.json" }
];
self.addEventListener("install", function(event) {
  console.log("sw installed successfully");
});

self.addEventListener("fetch", event => {
  console.log("fetch event recieved ", event.request);
  let skip = false;
  for (let i = 0; i < matches.length; i += 1) {
    if (matches[i].pattern.exec(event.request.url)) {
      skip = true;
      event.respondWith(fetch(new Request("."+matches[i].url)));
      break;
    }
  }
  if (!skip) fetch(event.request);
});
