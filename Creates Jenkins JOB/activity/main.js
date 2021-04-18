let puppeteer = require("puppeteer");
let fs = require("fs");
let input_values = require("./input.json");
let newPage1;
let browserInstance;
let link = input_values.link;
let username = input_values.username;
let password = input_values.password;
let JOB_FOLDER_NAME = input_values.JOB_FOLDER_NAME;
let Schema = input_values.Schema;
let MachineName = input_values.MachineName;

let a1_Job_Name = 'a1_' + Schema + "_install-and-db-upgrade";
let b1_Job_Name = "b1_" + Schema + "_" + MachineName + "-db-upgrade";
let b2_Job_Name = "b2_" + Schema + "_" + MachineName + "_sonata-install";
let d1_Job_Name = "d1_" + Schema + "_" + MachineName + "_process-restart";
let STOP_Job_Name = "STOP_ONLY-" + Schema + "_" + MachineName;

let partialLink = link.split("/");
partialLink = partialLink[partialLink.length - 1];
let Folder_link = link + "/job/" + JOB_FOLDER_NAME;
(async function () {
    try {

        browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewreport: null,
            args: ["--start-maximized"]
        });

        let JenkinsPage = await createJenkinsJob(link, browserInstance);
        if ("folderAlreadyExists" == JenkinsPage) await folderAlreadyExists();
        else await createNewFolder();

    } catch (err) {
        console.log(err);
    }
})();

async function createJenkinsJob(link, browserInstance) {
    newPage1 = await browserInstance.newPage();
    await newPage1.goto(link);

    await newPage1.type("#j_username", username, { delay: 50 });
    await newPage1.type("[name='j_password']", password);
    await newPage1.click(".submit-button.primary");
    await newPage1.setViewport({ width: 1278, height: 600 });

    try {
        await newPage1.waitForSelector("[href='job/" + JOB_FOLDER_NAME + "/']", { visible: true });
        return "folderAlreadyExists";
    } catch (err) {
        console.log("Error is " + err);
    }

}

async function folderAlreadyExists() {
    console.log("Folder already exists");
    await newPage1.click("[href='job/" + JOB_FOLDER_NAME + "/']");
    await createNewJenkinsJobs();
    // await newPage.
}

async function createNewFolder() {
    console.log("I am here to create new Folder");
    await newPage1.waitForSelector(".icon-new-package.icon-md", { visible: true });
    await newPage1.click(".icon-new-package.icon-md");
    await newPage1.waitForSelector("#name", { visible: true });
    await newPage1.type("#name", JOB_FOLDER_NAME, { delay: 100 });
    await newPage1.click(".com_cloudbees_hudson_plugins_folder_Folder");
    await newPage1.click("#ok-button");
    await createNewJenkinsJobs();
}

async function createNewJenkinsJobs() {
    await a1_Job();
    let refresh = "[href=\'/" + partialLink + "/job/" + JOB_FOLDER_NAME + "/\']";
    await newPage1.click(refresh);
    await b1_Job();
    await b2_Job();
    await d1_Job();
    await STOP_Job();
    await newPage1.click(refresh);
}

async function a1_Job() {
    let newPage = await browserInstance.newPage();
    await newPage.goto(Folder_link);
    await newPage.setViewport({ width: 1278, height: 600 });
    await newPage.waitForSelector(".icon-new-package.icon-md", { visible: true });
    await newPage.click(".icon-new-package.icon-md");
    await newPage.waitForSelector("#name", { visible: true });
    await newPage.type("#name", a1_Job_Name, { delay: 100 });
    await newPage.click(".hudson_model_FreeStyleProject");
    await newPage.click("#ok-button");

    console.log("Now inside configuration");
    try {
        await newPage.waitForSelector("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", { visible: true });//Description
        await newPage.click("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']");
        await newPage.type("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", a1_Job_Name, { delay: 90 });

        // await newPage.click(getElementsBySelector().innerHTML="Discard old builds");//Discard old build
        // await newPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = true));
        await newPage.$eval("input[name='specified']", check => check.checked = true);

    } catch (err) {
        console.log(err);
    }

    // await newPage.waitForSelector("input[name='_.daysToKeep']");
    // await newPage.click("input[name='_.daysToKeep']");
    // await newPage.type("input[name='_.daysToKeep']",7);
    await newPage.click("#yui-gen207-button");
    await newPage.close();
    return;
}
async function b1_Job() {
    let newPage = await browserInstance.newPage();
    await newPage.goto(Folder_link);
    await newPage.setViewport({ width: 1278, height: 600 });
    await newPage.waitForSelector(".icon-new-package.icon-md", { visible: true });
    await newPage.click(".icon-new-package.icon-md");
    await newPage.waitForSelector("#name", { visible: true });
    await newPage.type("#name", b1_Job_Name, { delay: 100 });
    await newPage.click(".hudson_model_FreeStyleProject");
    await newPage.click("#ok-button");

    console.log("Now inside configuration");
    try {
        await newPage.waitForSelector("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", { visible: true });//Description
        await newPage.click("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']");
        await newPage.type("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", b1_Job_Name, { delay: 90 });

        // await newPage.click(getElementsBySelector().innerHTML="Discard old builds");//Discard old build
        // const check=await newPage.$("#cb31");
        // await newPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = true));
        await newPage.$eval("input[name='specified']", check => check.checked = true);

    } catch (err) {
        console.log(err);
    }

    // await newPage.waitForSelector("input[name='_.daysToKeep']");
    // await newPage.click("input[name='_.daysToKeep']");
    // await newPage.type("input[name='_.daysToKeep']",7);
    await newPage.click("#yui-gen207-button");
    await newPage.close();
    return;
}
async function b2_Job() {
    let newPage = await browserInstance.newPage();
    await newPage.goto(Folder_link);
    await newPage.setViewport({ width: 1278, height: 600 });
    await newPage.waitForSelector(".icon-new-package.icon-md", { visible: true });
    await newPage.click(".icon-new-package.icon-md");
    await newPage.waitForSelector("#name", { visible: true });
    await newPage.type("#name", b2_Job_Name, { delay: 100 });
    await newPage.click(".hudson_model_FreeStyleProject");
    await newPage.click("#ok-button");

    console.log("Now inside configuration");
    try {
        await newPage.waitForSelector("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", { visible: true });//Description
        await newPage.click("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']");
        await newPage.type("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", b2_Job_Name, { delay: 90 });

        // await newPage.click(getElementsBySelector().innerHTML="Discard old builds");//Discard old build
        // await newPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = true));
        await newPage.$eval("input[name='specified']", check => check.checked = true);

    } catch (err) {
        console.log(err);
    }

    // await newPage.waitForSelector("input[name='_.daysToKeep']");
    // await newPage.click("input[name='_.daysToKeep']");
    // await newPage.type("input[name='_.daysToKeep']",7);
    await newPage.click("#yui-gen207-button");
    await newPage.close();
    return;
}
async function d1_Job() {
    let newPage = await browserInstance.newPage();
    await newPage.goto(Folder_link);
    await newPage.setViewport({ width: 1278, height: 600 });
    await newPage.waitForSelector(".icon-new-package.icon-md", { visible: true });
    await newPage.click(".icon-new-package.icon-md");
    await newPage.waitForSelector("#name", { visible: true });
    await newPage.type("#name", d1_Job_Name, { delay: 150 });
    await newPage.click(".hudson_model_FreeStyleProject");
    await newPage.click("#ok-button");

    console.log("Now inside configuration");
    try {
        await newPage.waitForSelector("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", { visible: true });//Description
        await newPage.click("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']");
        await newPage.type("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", d1_Job_Name, { delay: 90 });

        // await newPage.click(getElementsBySelector().innerHTML="Discard old builds");//Discard old build
        // await newPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = true));
        await newPage.$eval("input[name='specified']", check => check.checked = true);

    } catch (err) {
        console.log(err);
    }

    // await newPage.waitForSelector("input[name='_.daysToKeep']");
    // await newPage.click("input[name='_.daysToKeep']");
    // await newPage.type("input[name='_.daysToKeep']",7);
    await newPage.click("#yui-gen207-button");
    await newPage.close();
    return;
}
async function STOP_Job() {
    let newPage = await browserInstance.newPage();
    await newPage.goto(Folder_link);
    await newPage.setViewport({ width: 1278, height: 600 });
    await newPage.waitForSelector(".icon-new-package.icon-md", { visible: true });
    await newPage.click(".icon-new-package.icon-md");
    await newPage.waitForSelector("#name", { visible: true });
    await newPage.type("#name", STOP_Job_Name, { delay: 100 });
    await newPage.click(".hudson_model_FreeStyleProject");
    await newPage.click("#ok-button");

    console.log("Now inside configuration");
    try {
        await newPage.waitForSelector("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", { visible: true });//Description
        await newPage.click("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']");
        await newPage.type("div[style='position: relative; z-index: 0; outline: none; min-width: 1px;']", STOP_Job_Name, { delay: 90 });

        // await newPage.click(getElementsBySelector().innerHTML="Discard old builds");//Discard old build
        // await newPage.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = true));
        await newPage.$eval("input[name='specified']", check => check.checked = true);

    } catch (err) {
        console.log(err);
    }

    // await newPage.waitForSelector("input[name='_.daysToKeep']");
    // await newPage.click("input[name='_.daysToKeep']");
    // await newPage.type("input[name='_.daysToKeep']",7);
    await newPage.click("#yui-gen207-button");
    await newPage.close();
    return;
}
