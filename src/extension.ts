import * as vscode from 'vscode';
import { Args } from './Args';
import { PickCommand } from './PickCommand';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('filePicker.pick', (args: Args) => new PickCommand(args).Invoke());

    context.subscriptions.push(disposable);
}

export function deactivate() {}