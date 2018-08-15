# A deep dive into TypeScript decorators

https://www.spectory.com/blog/A%20deep%20dive%20into%20TypeScript%20decorators

TypeScript のデコレータ（Decorator）を利用すれば、ASP（Aspect Oriented Programming） を実現できる。

## ASP（Aspect Oriented Programming） とは

簡潔に言ってしまえば、「**元のソースコードに変更を加えずに新たな処理を追加することができる**プログラミングパラダイム」。

別の言い方をすれば、「横断的関心事（Cross-Cutting Concerns）を扱うプログラミングパラダイム」。

### 横断的関心事とは

> オブジェクト指向によって「関心事の分離」は完成したかに見えたが、オブジェクト指向が実践で活用されるようになると新たな問題点が明らかになってきた。分離された各モジュール内に別のモジュールを呼び出す処理が散在してしまうという問題点である。この散在する記述こそが、まさに「横断的関心事」と呼ばれているものである。

> 「横断的関心事」の例としては「ロギング」が有名である。オブジェクト指向によって「ロギング」という役割を持ったオブジェクトを分離するまではできたのだが、ロギング処理が必要となる各モジュール内ではロギングモジュールを利用する記述が必要になる（具体的にはインスタンスの生成とメソッド・コールなど）。

http://www.itmedia.co.jp/im/articles/0410/20/news086.html

> 「相互に関連しあっていて，何か機能変更などがあった場合に 同時に変更されるものは，できるだけ１つのモジュールにまとめておきたい」 という要求がありますが， 何らかの理由でモジュールとしてまとめられない 関心事のことを横断的関心事と呼んでいます

http://netail.net/aosdwiki/index.php?%B2%A3%C3%C7%C5%AA%B4%D8%BF%B4%BB%F6

### ASP の特徴・メリット

共通処理を抜き出して、プログラムの様々な箇所で横断的(Aspect)に呼び出せる。

そのため、本来プログラムが持つべき本質的機能（メインの処理）からロギングのような予備的機能（メインの処理とは無関係な処理）を分離できる。

## Method decorator

以下は`foo()`メソッドを実行時に、`log()`を実行している例。

```ts
/**
 * デコレータ
 * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
 * @param key メンバの名前
 * @param descriptor メンバのプロパティディスクリプタ
 */
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(`${key} was called!`);
}

class P {
  // デコレータを宣言する
  @log
  foo() {
    console.log(`Do something`);
  }
}

const p = new P();
p.foo();
// => foo was called!
// => Do something
```

デコレータ内でメンバ（メソッド）の引数を利用したい場合、以下のようになる。

```ts
/**
 * デコレータ
 * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
 * @param key メンバの名前
 * @param descriptor メンバのプロパティディスクリプタ
 */
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  // 宣言箇所の引数（今回の場合はfoo(a, b)のa、b)を利用したい場合は
  // 以下のように関数を定義すれば利用できる（argumentsから参照できる）
  descriptor.value = function() {
    console.log(`${key} was called with:`, arguments);

    // 以下のように originalMethod（foo）を apply して返さないと
    // fooの本来の処理が実行されない
    const result = originalMethod.apply(this, arguments);
    return result;
  };

  return descriptor;
}

class P {
  // デコレータを宣言する
  @log
  foo(a, b) {
    console.log('a is', a);
    console.log('b is', b);
    console.log(`Do something`);
  }
}

const p = new P();
p.foo('hello', 'world');
// => foo was called with: { '0': 'hello', '1': 'world' }
// => Do something
```
