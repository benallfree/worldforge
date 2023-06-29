import { readFileSync, statSync, writeFileSync } from 'fs'
// Bump the build number
const BUILDINFO = './buildInfo.json'
const buildInfo = JSON.parse(readFileSync(BUILDINFO).toString())
buildInfo.bytes = statSync(`./out.zip`).size
writeFileSync(BUILDINFO, JSON.stringify(buildInfo, null, 2))

const readme = readFileSync('./README.md').toString()
const newReadme = readme
  .replace(/<!-- BUILD -->\d+/, buildInfo.build)
  .replace(/<!-- BYTES -->\d+/, buildInfo.bytes)

writeFileSync(`./README.md`, newReadme)
