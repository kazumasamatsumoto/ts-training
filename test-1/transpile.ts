import * as ts from "typescript";

const source = "let x: string  = 'Hello, TypeScript'";

let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

console.log(result.outputText);
