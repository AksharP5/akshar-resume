#!/usr/bin/env node

import chalk from "chalk";
import qr from "qrcode-terminal";
import wrap from "wrap-ansi";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resume = JSON.parse(
  fs.readFileSync(__dirname + "/resume.json", "utf8")
);

const args = new Set(process.argv.slice(2));

if (args.has("--json")) {
    console.log(JSON.stringify(resume, null, 2));
    process.exit(0);
}

function format(text) {
    return wrap(text, 80, { hard: true });
}

function printBullets(bullets) {
    bullets.forEach((b) => console.log(format("  - " + b)));
}

console.log(chalk.bold(chalk.green("\n" + resume.name)));
console.log(
    `${chalk.gray(resume.contact.email)}\n` + 
    `${chalk.gray(resume.contact.github + " | " + resume.contact.linkedin + " | " + resume.contact.portfolio)}\n`
);

console.log(chalk.underline("Experience\n"));
resume.experience.forEach((job) => {
    console.log(
        chalk.bold(job.role) + 
            ` - ${job.company} (${chalk.gray(job.period + ", " + job.location)})`
    );
    printBullets(job.bullets);
    console.log();
});

console.log(chalk.underline("Projects\n"));
resume.projects.forEach((proj) => {
    console.log(chalk.bold(proj.name) + " | " + proj.tech + ` (${chalk.gray(proj.period)})`);
    console.log(chalk.gray(proj.link));
    printBullets(proj.bullets);
    console.log();
});

console.log(chalk.underline("Education\n"));
console.log(
    chalk.bold(resume.education.school) + ` - ${chalk.gray(resume.education.years + ", " + resume.education.location)}`
);
console.log(resume.education.degree + "\n");

console.log(chalk.underline("Technical Skills\n"));
Object.entries(resume.skills).forEach(([cat, list]) => {
    console.log(chalk.bold(cat + ":") + " " + list.join(", "));
});

if (args.has("--qr")) {
    console.log(chalk.dim("\nPortfolio QR:"));
    qr.generate(resume.contact.portfolio, { small: true });
}

