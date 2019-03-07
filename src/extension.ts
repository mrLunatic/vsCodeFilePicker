// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

interface IFileInfo {
	readonly name: string;
	readonly path: string;
}

function getOutputFile(file: string, root: string, type: string|undefined): string|undefined {
	if (!type) {
		return './' + path.relative(root, file);
	}
	if (type === "absolute") {
		return file;
	}
	if (type === "folder") {
		const dir = path.dirname(file);
		return './' + path.relative(root, dir);
	}
	if (type === "folderAbsolute") {
		return path.dirname(file);
	}
}

function getOutputName(file: string, type: string | undefined): string|undefined {
	if (!type) {
		return path.basename(file);
	}
	if (type === "package") {
		if (file.indexOf("node_modules") >= 0) {
			return undefined;
		}
		const p = JSON.parse(fs.readFileSync(file, 'utf8'));
		return p ? p.name : undefined;
	}
}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('filePicker.pick', async (args: any) => {
		const map = new Map<string, string>();

		for (const folder of vscode.workspace.workspaceFolders) {
			for (const mask of args.masks) {
				var files = await getFilesAsync(path.join(folder.uri.fsPath, mask));
				console.log(files.join(', '));
				
				for (const file of files) {
					const key = getOutputName(file, args.type);
					const value = getOutputFile(file, folder.uri.fsPath, args.outType);
					if (key && value) {
						map.set(key, value);
					}
				}
			}

		}

		const names = Array.from(map.keys());
		const selected = await vscode.window.showQuickPick(names);
		return map.get(selected);
	});

	context.subscriptions.push(disposable);
}


function getFilesAsync(pattern: string): Promise<Array<string>> {
	return new Promise<Array<string>>((resolve, reject) => {
		glob(pattern, (err, files) => {
			return err ? reject(err) : resolve(files)
		})
	})
}

// this method is called when your extension is deactivated
export function deactivate() {}
