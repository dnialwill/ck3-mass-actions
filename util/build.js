const { createDescriptorModFiles } = require("./create-descriptor-mod-files");

build();

async function build() {
  await createDescriptorModFiles();
}
