#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function getNpmBinDir() {
  try {
    const prefix = execSync("npm config get prefix 2>/dev/null", {
      encoding: "utf8",
    }).trim();
    return path.join(prefix, "bin");
  } catch {
    return null;
  }
}

const binDir = getNpmBinDir();
if (!binDir) process.exit(0);

const ccLink = path.join(binDir, "cc");
try {
  const target = fs.readlinkSync(ccLink);
  if (target.includes("claude-cc")) {
    fs.unlinkSync(ccLink);
    console.log("");
    console.log("  Removed old `cc` symlink from a previous claude-cc install.");
    console.log("  The command has been renamed to `ccc`.");
    console.log("");
  }
} catch {
  // not a symlink or doesn't exist — nothing to do
}
