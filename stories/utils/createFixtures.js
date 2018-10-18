import {
  getProcess,
  getStep,
  getSimpleGrid,
  runSelectProcessor,
  getGridList,
  getSection,
  getAddTemplate
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

writeFileSync(getFileName("section"), wrapDescription(sectionProcess));

writeFileSync(
  getFileName("section-with-data"),
  wrapDescription(sectionProcessWithData, {
    firstName: "Chidi",
    surname: "Onuekwusi"
  })
);

writeFileSync(getFileName("grid"), wrapDescription(_p));

writeFileSync(getFileName("select"), out(runSelectProcessor()));

writeFileSync(getFileName("grid-source"), out(getGridList()));

writeFileSync(getFileName("add-template"), out(getAddTemplate()));
