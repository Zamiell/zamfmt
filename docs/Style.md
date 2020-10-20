# zamfmt Style

`zamfmt` chooses to style code in a style based on the [Roblox style guide](https://roblox.github.io/lua-style-guide/), which is the most popular Lua style guide in the world and the top Google result for "lua style guide". The Roblox guide builds on the [LuaRocks style guide](https://github.com/luarocks/lua-style-guide) and the [lua-users.org style guide](http://lua-users.org/wiki/LuaStyleGuide) .

<br />

### Table of Contents

1. Spaces
1. Newlines
1. Empty Lines

<br />

### Spaces

* 1.1 There should be a single space between tokens on the same line.

> Why? Multiple spaces are often a typo.

```
-- bad
local a = 1  + 1

-- good
local a = 1 + 1
```

* 1.1.1 All operators should have 1 space between them.

> Why? This allows for easier readability, especially when trying to parse a sequence of many operations at a time.

```
-- bad
local x=y+5;

-- good
local x = y + 5;
```

* 1.1.2 Code should not be aligned with code on nearby lines.

> Why? This produces unnecessary git churn because if one line is edited, the resulting git diff now spills over to many other unrelated lines.

```
-- bad
local apple  = 'apple'
local orange = 'orange'
local pear   = 'pear'

-- good
local apple = 'apple'
local orange = 'orange'
local pear = 'pear'
```

 In the cases where multiple lines are all aligned with whitespace to be more uniform

> Why? In some styles, consecutive code is

* 1.2 There should be no trailing whitespace on a line.

> Why? Trailing whitespace serves no purpose and is almost always a typo.

<br />

### Newlines

* 2.1 Newlines should always be "\n", even on Windows. (By default, on Windows they are "\r\n".)

> Why? This prevents accidentally committing new files to a repository with the wrong line endings, it ensures that files are exactly the same between developers on different operating systems, and it reduces the size of source code files. Nowadays, every Windows-based text editor can understand Unix-style newlines, even Notepad.

<br />

### Empty Lines

* 3.2 The maximum amount of consecutive empty lines should be 1. Additional sequential newlines More than one newline should be truncated to just one.

> Why?

* 2.2 There should be a newline at the end of every file.

> Why? As [explained by Stack Overflow](https://stackoverflow.com/questions/729692/why-should-text-files-end-with-a-newline), this is a POSIX standard. It helps keeps files uniform