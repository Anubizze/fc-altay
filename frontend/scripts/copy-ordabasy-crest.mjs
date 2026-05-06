import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const homedir = process.env.USERPROFILE || process.env.HOME || "";
const src = path.join(homedir, ".cursor", "projects", "c-Users-Desktop-fcaltay", "assets", "ordabasy.png");
const destDir = path.join(__dirname, "..", "public", "teams");
const dest = path.join(destDir, "ordabasy.png");

if (!fs.existsSync(src)) {
  console.error("Source not found:", src);
  process.exit(1);
}
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("Copied to", dest);
