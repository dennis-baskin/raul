# RAUL UI/UX Framework

## Installation

The following instructions assume Unix-based systems. We welcome any Windows
gurus who would like to contribute to the instructions.

Make sure you have NPM and Node installed. If you already have all of this or
don't need the details, you can skip to the next section.

### Use NVM (Node Version Manager) to install node, etc

Please note that `v0.33.8` of NVM will most likely be outdated, and it is
recommended to follow the instructions on
[https://github.com/creationix/nvm](https://github.com/creationix/nvm)
to install latest version of NVM

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

Then add NVM to your path.

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

> NOTE: Don't forget to put this in your `~/.bash_profile`, or `~/.bashrc`, etc.

Check local and remote node versions. This will help determine your version vs
available versions.

```
# lists local versions of node
nvm ls

# You might see something similar
#
# $ nvm ls
#          v9.6.1
# ->       system
# default -> v9.6.1
# lts/carbon -> v8.9.4 (-> N/A)

# lists available versions of node in remote
nvm ls-remote
```

Get the latest stable version (carbon currently) of node.

```
nvm install --lts
```

Make stable version (currently lts/carbon) the default

```
nvm alias default lts/carbon
```

### Get the RAUL repo

```
git clone git@github.com:realpage-property-os/raul.git
cd raul
npm install
```

### RAUL cli toolkit

RAUL comes with a simple toolkit for easier actions on the command line. First
you need to install local copy of raul globally or just let the npm script do it
for you.

```
npm run raul-init
```

Running the help command shows all available commands `raul` tool has to offer

```
$ raul help
raul [command]

Commands:
  raul build [watch]  runs RAUL build process                                           [aliases: b]
  raul deploy         Deploys dist directory to AWS RAUL repo                           [aliases: d]
  raul eslint         runs eslint using local node modules install                      [aliases: e]
  raul gulp [task]    runs gulp tasks without needing global gulp installed             [aliases: g]
  raul lint           runs all lint tasks                                               [aliases: l]
  raul release        Prepares branch for release after changelog is updated            [aliases: r]
  raul server         starts a local RAUL server                                 [aliases: start, s]
  raul test           runs e2e and unit tests                                           [aliases: t]

Options:
  --verbose                                                                         [default: false]
  --help     Show help                                                                     [boolean]
  --version  Show version number                                                           [boolean]
```

### Linters

The simplest way to to stay compliant with the code style guide, is to run your code through the
linters for HTML, SASS, and JS/ES. All linters will run when the package is built. You can run
`raul lint` (or `raul eslint` for just js), or you can opt to install the linter packages globally.
One reason you might want to install globally is to utilize autofixing.

### Tests

Both unit tests and end to end tests are available. However, e2e tests need to be better defined /
fleshed out. You can run unit tests with

```
raul test -u
```

## Workflow

The basic workflow is as follows:

* Add component / Fix / Imporvement
* Add unit test if appropriate
* Run build (or run build with watch command from beginning)
* Follow git workflow and open a Pull Request against master

For git workflow, please read over the [GIT_WORKFLOW](./GIT_WORKFLOW.md) document

## Code Reviews

Code reviews are mandatory and require the sign off of at least one core team member.

## Releases

Releases are only made by the core RAUL team, and we are happy to help work on
any release.

All releases in this repository are located at https://cdn.realpage.com/raul/ and allow you to
reference either **minor** or **patch** versions.  The `dist/` directory's contents are
deployed to the CDN.  Feel free to browse the
[previous releases](https://github.com/realpage-property-os/raul/releases) to explore the
contents of the various versions.

Examples:

* https://cdn.realpage.com/raul/v2.16.1/styleguide/index.html - Allows you to lock into a specific patch version
* https://cdn.realpage.com/raul/v2.16/styleguide/index.html - Allows you to inherit non-breaking changes

It is recommended to use the second format whenever possible. The caveat with the second variation
is cached assets.
