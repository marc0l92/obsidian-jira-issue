import { readFileSync, writeFileSync } from "fs"

let targetVersion
if (process.argv.length == 3) {
    targetVersion = process.argv[2]
    let packageJson = JSON.parse(readFileSync("package.json", "utf8"))
    packageJson.version = targetVersion
    writeFileSync("package.json", JSON.stringify(packageJson, null, "    "))
} else {
    targetVersion = process.env.npm_package_version
}

// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"))
const { minAppVersion } = manifest
manifest.version = targetVersion
writeFileSync("manifest.json", JSON.stringify(manifest, null, "  "))

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"))
versions[targetVersion] = minAppVersion
writeFileSync("versions.json", JSON.stringify(versions, null, "  "))
