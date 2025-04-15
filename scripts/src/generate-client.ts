import { execSync } from "node:child_process";
import * as fs from "fs";
import * as path from "path";

const openapiUrl = "http://<ip>/docs/openapi.json";
const generateClientsCommand = "npx @openapitools/openapi-generator-cli generate -i ./swagger/openapi.json -g typescript-axios -o src/client --additional-properties=supportsES6=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models --enable-post-process-file";
const wd = process.cwd().replace("scripts", "app");
const swaggerDir = path.join(wd, "swagger");

if (!fs.existsSync(swaggerDir)) {
    fs.mkdirSync(swaggerDir, { recursive: true });
}

async function downloadOpenapi() {
    console.log("[ ] Downloading openapi.json from:", openapiUrl);
    try {
        const response = await fetch(openapiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const openapiPath = path.join(swaggerDir, "openapi.json");
        fs.writeFileSync(openapiPath, JSON.stringify(data, null, 2), "utf-8");
        console.log("[✔] Downloaded openapi.json at:", openapiPath);
    } catch (error) {
        console.error("Download error:", error);
        process.exit(1);
    }
}

async function main() {
    await downloadOpenapi();

    console.log();
    console.log("[ ] Substituting module name");
    const apiSpec = path.join(swaggerDir, "openapi.json");
    let content = fs.readFileSync(apiSpec, "utf-8");
    content = content.replace(/"title": "\w*"/, `"title": "DNP"`);
    fs.writeFileSync(apiSpec, content, "utf-8");
    console.log("[✔] Substituting module name");

    console.log();
    console.log("[ ] Generating clients");
    console.log(execSync(generateClientsCommand, { cwd: wd }).toString());
    console.log("[✔] Generating clients");
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
