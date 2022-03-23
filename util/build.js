const fs = require("fs").promises;

build();

async function build() {
  await createDescriptorModFiles();
}

async function createDescriptorModFiles() {
  console.log("Building app...");

  try {
    const packageJson = require("../package.json");
    let { ck3: metadata, version } = packageJson;
    metadata = { ...metadata, version };

    if (!metadata) throw new Error("No metadata in package.json!");

    const descriptorLines = [];

    for (const key in metadata) {
      const value = metadata[key];

      const line = !Array.isArray(value)
        ? `${key}="${value}"`
        : `${key}={\r\n${value.map((val) => `\t"${val}"`).join("\r\n")}\r\n}`;

      descriptorLines.push(line);
    }

    const descriptorText = descriptorLines.join("\r\n");

    await fs.mkdir("./dist");
    await fs.writeFile(`./dist/${metadata.name}.mod`, descriptorText);
    await fs.mkdir(`./dist/${metadata.name}`);
    await fs.writeFile(`./dist/${metadata.name}/descriptor.mod`, descriptorText);
  } catch (e) {
    throw new Error("An error occurred: " + e.message);
  }

  console.log("Build complete!");
}
