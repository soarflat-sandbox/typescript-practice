# TypeScript files and projects

VS コードの TypeScript サポートは、2 つの異なるモードがある。

- File Scope

このモードでは、VSCode で開いた TypeScript ファイルは独立したユニットとして扱われる。`a.ts`が`b.ts`を明示的に（[Triple-Slash Directives](https://code.visualstudio.com/docs/languages/typescript)、または外部モジュールを使用して）参照しない限り、2 つのファイル間に共通のコンテキストは存在し  ない。

- Explicit Project

TypeScript プロジェクトは、`tsconfig.json`ファイルで定義される。`tsconfig.json`がディレクトリに存在することは、そのディレクトリが TypeScript プロジェクトのルートであることを示す。`tsconfig.json`自体には、プロジェクトに属するファイルとコンパイラオプションが一覧表示される。`tsconfig.json`ファイルの詳細は、[こちら](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)を参照。

> TIPS: file Scope プロジェクトに対して explicit プロジェクトを使用することをお勧めします。explicit プロジェクトではプロジェクト言語に属するファイルが一覧表示されるため、`Find All References` `⇧F12`のような機能は file Scope ではなく project scope とみなされます。

## `tsconfig.json`

通常、新しい TypeScript プロジェクトの最初のステップは、`tsconfig.json` を追加することである。

これは、コンパイラオプションやインクルードする必要があるファイルなど、[TypeScript プロジェクトの設定](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)を定義する。

`tsconfig.json`を作業ディレクトリに追加すれば、IntelliSense（`^Space`）がサポートをしてくれる。

以下は単純な `tsconfig.json` の例。ES5、CommonJS モジュール、およびソースマップを定義している。

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  }
}
```

### `typescript.reportStyleChecksAsWarnings`

デフォルトでは、VS Code TypeScript は、エラーではなく警告としてコードスタイルの問題を表示する。

適用対象は以下の通り。

- 変数は宣言されてるが、使用されていない
- プロパティは宣言されているが、その値は決して読み込まれいない
- 到達不能コードが検出された
- 未使用ラベル
- Fall through case in switch
- すべてのコードパスが値を返すわけでは  ない

これらを警告として扱うことは、TSLint などの他のツールと一貫している。 これらは、コマンドラインから `tsc` を実行するとエラーとして表示される。

この動作を無効にするには、ユーザー設定ファイルで `"typescript.reportStyleChecksAsWarnings"：false`を設定する。

## Transpiling TypeScript into JavaScript

VSCode は、統合された[タスクランナー](https://code.visualstudio.com/docs/editor/tasks)を通して `tsc` と統合される。 これを使って.ts ファイルを.js ファイルに変換することができます。 VS コードタスクを使用するもう 1 つの利点は、[問題]パネルに統合されたエラーと警告の検出が表示されることです。 シンプルな TypeScript の Hello World プログラムを紹介しましょう。

### Step 1: Create a simple TS file

空のフォルダで VSCode を開き、`HelloWorld.ts` ファイルを作成し、そのファイルに以下のコードを挿入する。

```ts
class Startup {
  public static main(): number {
    console.log('Hello World');
    return 0;
  }
}

Startup.main();
```

`HelloWorld.ts`が動作するかテストするためには、ターミナルを開き、`tsc HelloWorld.ts` と入力する。 結果として`HelloWorld.js`が出力される。`node HelloWorld.js`を入力すれば実行結果を確認できる。

### Step 2: Run the TypeScript build

グローバルタスクメニューから`Run Build Task...`を実行する。 tsconfig.json ファイルを作成した場合は、次のピッカーが表示されます。

### Step 3: Make the TypeScript Build the default

TypeScript build task をデフォルトの build task として定義して、`Run Build Task`（`⇧⌘B`）をトリガするときに直接実行することもできる。

これを行うには、グローバルタスクメニューから`Configure Default Build Task`を選択する。

これは、利用可能なビルドタスクを持つピッカーを示しています。 次の `tasks.json` ファイルを生成する TypeScript `tsc：build` を選択します。

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "problemMatcher": ["$tsc"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

#### Step 4: Reviewing build issues
