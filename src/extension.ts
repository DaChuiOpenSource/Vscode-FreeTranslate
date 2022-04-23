// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Engine } from './core/engine';

let output: vscode.OutputChannel = vscode.window.createOutputChannel('FreeTranslate');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Vscode-FreeTranslate" is now active!');
	let engine = new Engine(context, output);
	engine.init();
	engine.initPickCommand();

	// set the statusItem
	let statusItem: vscode.StatusBarItem = vscode.window.createStatusBarItem('Lang', vscode.StatusBarAlignment.Left, 1);
	statusItem.tooltip = 'set the FreeTranslate language';
	statusItem.text = 'TranslateLang';
	statusItem.command = 'Vscode-FreeTranslate.quickpick';
	statusItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() {
	output.dispose();
	//statusItem.dispose();
}
