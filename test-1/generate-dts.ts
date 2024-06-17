import * as ts from "typescript";

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const createdFiles: { [fileName: string]: string } = {};
  const host = ts.createCompilerHost(options);
  host.writeFile = (fileName: string, contents: string) => createdFiles[fileName] = contents;

  const program = ts.createProgram(fileNames, options, host);
  program.emit();

  fileNames.forEach(file => {
    console.log("### JavaScript\n");
    console.log(host.readFile(file));

    console.log("### Type Definition\n");
    const dts = file.replace(".js", ".d.ts");
    console.log(createdFiles[dts]);
  });
}

compile(process.argv.slice(2), {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
});
