import * as vscode from 'vscode';
import translate from '../translate/translate';
import { vdetect } from '../detect/detect';
import langtranslatedatas from '../lang/langtranslatedatas';

export class Engine {
	private context: vscode.ExtensionContext;
	private output: vscode.OutputChannel;

	constructor(context: vscode.ExtensionContext, output: vscode.OutputChannel) {
		this.context = context;
		this.output = output;
	}

	/**
	 * the extension's main command
	 */
	public init() {
		// The command has been defined in the package.json file
		// Now provide the implementation of the command with registerCommand
		// The commandId parameter must match the command field in package.json
		let disposable = vscode.commands.registerCommand('Vscode-FreeTranslate.translate', () => {
			// The code you place here will be executed every time your command is executed
			let editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
			if (editor == undefined) return;
			let document: vscode.TextDocument | undefined = editor.document;

			let select = document.getText(editor.selection);
			this.createDecorat(editor, new vscode.Range(editor.selection.start, editor.selection.end));
			// this.output.appendLine('> Identifier: DaChuiOpenSource');
			this.output.appendLine('> Translate content: ' + select);

			// the config default.lang
			let defaultConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('translate.default');
			let defaultLang: string = defaultConfig['lang'];
			let msg = '> defaultLang: ' + defaultLang;

			// detect current language accord the line content
			let lineContentAtCursor = document.lineAt(editor.selection.active.line).text;
			//this.output.appendLine(lineContentAtCursor);
			let lang = vdetect(lineContentAtCursor);
			msg = msg + ';  detectLang: ' + lang;
			this.output.appendLine(msg);

			// translate the user selected content
			let output = this.output;
			let to = langtranslatedatas[defaultLang];
			if (to == undefined || to == null) {
				output.appendLine('> Error: not find translate language, please check');
				output.appendLine('');
			} else {
				translate(select, null, to).then(function (res) {
					output.appendLine('> Result: ' + res);
					output.appendLine('');
				}, function (err) {
					output.appendLine(err);
				});
			}
			this.output.show();
			// Display a message box to the user
			//vscode.window.showInformationMessage('Hello World from Vscode-FreeTranslate!');
		});

		this.context.subscriptions.push(disposable);
	}

	public createDecorat(editor: vscode.TextEditor, range: vscode.Range) {
		let decorat: vscode.TextEditorDecorationType = vscode.window.createTextEditorDecorationType({
			overviewRulerLane: vscode.OverviewRulerLane.Center,
			rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen,
			color: 'red',
			backgroundColor: '#66f',
			borderStyle: 'solid',
			borderColor: '#66f',
			//borderWidth: '13px 13px 13px 13px',
			after: {
				//contentText: 'translate result borderColor borderColor The command has been defined in the package.json fileThe command has been defined in the package.json fileThe command has been defined in the package.json fileborderColor',
				border: '3',
				borderColor: 'red',
				margin: '3',
				width: '13%'
			},
		});
		editor.setDecorations(decorat, [range]);
		setTimeout(() => {
			decorat.dispose();
		}, 1000);
	}
	/**
	 * display the quick pack command
	 */
	public initPickCommand() {
		let disposable = vscode.commands.registerCommand('Vscode-FreeTranslate.quickpick', () => {
			vscode.window.showQuickPick(Object.keys(langtranslatedatas), {
				placeHolder: 'select an option',
			}).then(function (res) {
				let config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('translate.default');
				config.update('lang', res, vscode.ConfigurationTarget.Global);
				//console.log(config.get('lang'));
				//console.log(config.inspect('lang'));
			});
		});
		this.context.subscriptions.push(disposable);
	}
}