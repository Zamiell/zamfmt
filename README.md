# zamfmt

`zamfmt` is a pretty-printer for [Lua](https://www.lua.org/) code, written in [TypeScript](https://www.typescriptlang.org/). It is inspired by [gofmt](https://golang.org/cmd/gofmt/) for [Go](https://golang.org/), [rustfmt](https://github.com/rust-lang/rustfmt) for [Rust](https://www.rust-lang.org/), [Prettier](https://prettier.io/) for [JavaScript](https://www.javascript.com/), [Black](https://github.com/psf/black) for [Python](https://www.python.org/), and so on.

The idea of `zamfmt` is that you set up your text editor to automatically format your Lua code whenever you press `Ctrl + s` to save the file. This bypasses the boring minutia of formatting a new code block, saving you precious seconds. And as the days turn to weeks, these seconds add up to save you a metric shit-ton of time.

Andrew Gerrand [summarizes on the Go blog](https://blog.golang.org/gofmt) why automated code formatting is amazing. In short, auto-formatted code is:

* easier to **write**: never worry about minor formatting concerns while hacking away
* easier to **read**: when all code looks the same, you need not mentally convert others' formatting style into something you can understand
* easier to **maintain**: mechanical changes to the source don't cause unrelated changes to the file's formatting; diffs show only the real changes
* **uncontroversial**: never have a debate about spacing or brace position ever again!

<br />

### Style

See the [style documentation](./docs/Style.md).

<br />

### Installation

Nowadays, most people use either [Visual Studio Code](https://code.visualstudio.com/) (VSCode) or [ZeroBrane Studio](https://studio.zerobrane.com/) to code Lua.

#### Visual Studio Code

* Install the [zam-fmt extension]().
* Add the following to your workspace "settings.json" file (e.g. `C:\Users\james\Documents\My Games\Binding of Isaac Afterbirth+ Mods\racing+_dev\.vscode\settings.json`) or your global "settings.json" file (e.g. `C:\Users\james\AppData\Roaming\Code\User\settings.json`):

```
"[lua]": {
  "editor.formatOnSave": true,
},
```

* That's it. Now Lua code will be automatically formatted on save.

#### ZeroBrane Studio

* TODO
