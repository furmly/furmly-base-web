import {
  getProcess,
  getStep,
  getSimpleGrid,
  runSelectProcessor,
  getGridList,
  getSection,
  getAddTemplate,
  getActionView,
  runSaveActionProcessor,
  webview,
  image,
  label,
  html
} from "../fixtures/index";
import { writeFileSync } from "fs";
import { join } from "path";

const getFileName = name => join(__dirname, `../fixtures/${name}.json`);
const out = data => JSON.stringify(data, null, " ");
const wrapDescription = (description, data) => out({ data, description });

const _p = getProcess();
_p.steps.push(getStep());
_p.steps[0].form.elements.push(getSimpleGrid());

const sectionProcess = getProcess("section-process");
sectionProcess.steps.push(getStep());
sectionProcess.steps[0].form.elements.push(getSection());

const sectionProcessWithData = Object.assign({}, sectionProcess, {
  _id: "section-with-data"
});

const actionViewProcess = getProcess("actionview");
const aVStep = getStep();
aVStep.form.elements.push(getActionView());
actionViewProcess.steps.push(aVStep);

const webviewProcess = getProcess("webview");
const webStep = getStep();
webStep.form.elements.push(webview());
webviewProcess.steps.push(webStep);

const labelProcess = getProcess("label");
const labelStep = getStep();
labelStep.form.elements.push(label());
labelProcess.steps.push(labelStep);

const imageProcess = getProcess("image");
const imageStep = getStep();
imageStep.form.elements.push(image());
imageStep.form.elements.push(
  image({
    type: "URL",
    uid: "THUMBNAIL",
    data: "https://via.placeholder.com/150"
  })
);
imageStep.form.elements.push(
  image({
    type: "URL",
    uid: "AVATAR",
    data:
      "https://chidionuekwusi.github.io/Twaija-web/static/media/team.e8ae5bbd.jpg"
  })
);
imageProcess.steps.push(imageStep);

const htmlProcess = getProcess("htmlview");
const htmlStep = getStep();
htmlStep.form.elements.push(html());
htmlProcess.steps.push(htmlStep);

writeFileSync(getFileName("section"), wrapDescription(sectionProcess));

writeFileSync(
  getFileName("section-with-data"),
  wrapDescription(sectionProcessWithData, {
    firstName: "Chidi",
    surname: "Onuekwusi"
  })
);

writeFileSync(getFileName("actionview"), wrapDescription(actionViewProcess));

writeFileSync(getFileName("grid"), wrapDescription(_p));

writeFileSync(getFileName("select"), out(runSelectProcessor()));

writeFileSync(getFileName("grid-source"), out(getGridList()));

writeFileSync(getFileName("add-template"), out(getAddTemplate()));

writeFileSync(getFileName("save_processor"), out(runSaveActionProcessor()));

writeFileSync(getFileName("webview"), wrapDescription(webviewProcess));

writeFileSync(getFileName("label"), wrapDescription(labelProcess));

writeFileSync(getFileName("image"), wrapDescription(imageProcess));

writeFileSync(getFileName("htmlview"), wrapDescription(htmlProcess));
