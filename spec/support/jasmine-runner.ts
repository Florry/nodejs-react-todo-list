import Jasmine from "jasmine";

const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
	colors: 2,
	cleanStack: 1,
	verbosity: 4,
	listStyle: "indent",
	timeUnit: "ms",
	timeThreshold: { ok: 500, warn: 1000, ouch: 3000 },
	activity: false,
	emoji: true,
	beep: true,
});

const jRunner = new Jasmine({});
const noop = function () { };

jRunner.configureDefaultReporter({ print: noop });

jasmine.getEnv().addReporter(reporter);

jRunner.loadConfigFile("./spec/support/jasmine.json");
jRunner.execute();

export default () => { };