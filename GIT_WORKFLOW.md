# the TL;DR

* branches follow a {project}-{ticket-number}-lowercase-dashed-descriptive-name naming
* commits are separated into small contextual pieces
* pull requests must be small or else subject to architectural conversations
* avoid epic branches
* `raul` cli toolkit
  * Install toolkit `npm run raul-init`
  * run `raul build` (runs linters and builds dist files)
  * test locally by running `raul server`

----

![RAUL Git Workflow](raul-git-workflow.png?raw=true "RAUL Git workflow")

# Git Workflow

When working in a team environment it is important to have established guidelines.
This ensures that there is a standardization in the workflow, commit history, and
overall process. The need for this is to allow the team to be productive and
efficient.

This document tries to outline some standardization guidelines and worklows. It
is intended to be a living document and should be updated by the team if changes
are necessary.

This guide is intended to be best practice and not a holy document. If something
does not work, communicate it and change it. If it is not perfect, then work on
making it better next time. At no point should this become daunting rather than
helpful.

# Branch Workflow

Good practices to follow:

* Cut a new branch for every stand alone change
* Always cut from master, unless task belongs to epic
* Follow merge strategy outlined in workflow chart above
* Keep git history clean and easy to read
* Squash-merge branches into master or epic
* Delete and clean up branches that have been merged into master when possible

## Branch Names

Imagine a project manager is asking you to add a feature. You ask them to sum it
up in one short, descriptive sentence. That is your branch name.

* Should be short and descriptive
* Should be all lowercase delimited by a dash `-` between words
* Can allow for uppercase when adding acronyms
* Prefix temporary branches with `temp-` to not have them deleted from origin

The following examples assume you have a jira ticket number associated

```
# good

RAUL-1-add-animated-header-to-page-component
RAUL-2-refactor-power-module
RAUL-3-add-CRUD-endpoints-for-user-API
RAUL-4-include-auth-feature-for-users

# okay but not preferred

## missing project prefix and ticket number
add-animated-header-to-page-component

# bad

## does not convey any helpful information about the change
RAUL-1-update-project-from-requests-from-project-managers

## camel cased branch names are a burden to visually parse
RAUL-1-deleteTestSuite

## long and mixes casing
RAUL-1-remove-UserInterface-file-and-all-of-the-files-associated-with-it-because-we-will-find-so-many-it-will-be-crazy
```

## Branch Size

Generally there will be two types of branches that will created:

1. Feature
2. Epic

### Feature

Feature branches can encompass a variety of ticket types:

* Story
* Task
* Feature
* Improvement
* Sub-Task
* Bug

They are intended to be granular and contextual. They are designed to have the
goal be met and ready for release in the branch itself. There will never be a
need for a sub branching strategy in a feature branch.

### Epic

An a epic branch is focused on a larger feature set that cannot be delivered in
a small iteration. These are long on-going branches that require a sub-branching
strategy. It is best to avoid these as they necessitate continuous rebasing or
merging with master, as others work on the same repo.

It is best to take an Epic ticket (*not branch*) and decide on how Feature branches
could be created from it to facilitate continuous deployment of code.

> WARNING: Please do not commit to already merged branches. This creates conflict hell.

# Commit Workflow

## Commit Standards

Under any given branch it is common to have multiple commits. Sometimes you will
only have one.

* Keep each commit small and have it make sense to the context
* Multiple contexts should be separate commits
* Try to keep whitespace changes separate to reduce the reviewers' cognitive load
* Check spelling
* Verify it works on your end
* Avoid rebasing or squashing until after final review if possible

## Commit Message

* Write a single, short, descriptive message line about the change
* As you would with the branch name, imagine the instructions coming from a
  product perspective
* Describe what effect the commit will have when merged or included
  (e.g. "Fix…", "Add…", or "Change word order for readability";
  not "Fixed…", "Adds…", or "Changes from PR feedback")
  This follows git's own message format (e.g. Merge branch 'master')
* Avoid writing in past tense
* After ticket number, start sentence with uppercase letter
* When it's not obvious, use additional paragraphs to describe why the change is being made
* Always follow the subject with a blank line
* No need for period at the end
* If you have an associated JIRA tickeet, then prefix the commit message

```
# bad

"Created UserAuth.kt and updated User.kt as requested by product"

# good

"RAUL-101 Create auth feature for users

UserAuth.kt file is intended facilitate authentication process for Users.
User.kt is updated with additianal ...
"
```

```
# bad

"Refactor as requested from Code Review"

# good

"RAUL-101 Fix spelling mistake in UserAuth controller"
```

```
# bad

"Deleted update method for user.kt, added updateWith method"

# good

"RAUL-101 Only allow updates with auth token

deleted update method in User.kt
added updateWith method in User.kt
- must pass in an auth token
"
```

```
# good

"RAUL-101 Whitespace and indentation only to prepare for html refactor"
```

## Releases workflow:

1. As a code owner, check out `release` branch
2. Clean up any unstaged files, etc, and run `git reset orign/master --hard`
3. Update CHANGELOG.md to include info on latest release, in the exact same format as other releases
  * To get all commit information on all changes since last tag run: `git log <version>..HEAD`
4. Commit CHANGELOG.md changes
5. Push changes, and it automatically adds 3 more commits:
  * <version_number> - CI Release - Bump version in package [ci skip]
  * <version_number> - CI Release - Add Build Artifacts [ci skip]
  * <version_number> - CI Release - Remove Artifacts [ci skip]
6. All commits then get pushed back to master
  * Only CHANGELOG.md and package.json files should have any changes

### Stable branches workflow

When you decide on a branch to mark as stable, make sure that it is already merged into master and
has been released. Then cut a branch from the latest tag version you want to indicate as stable.
Use minor version v.X.Y (example: v2.50) format when naming branch. If you need to include patch
commits, just cut from the latest patch commit of the minor version, but still use the minor
version name. Example: you cut from v2.50.6 but the stable branch name is v2.50. Afterward, push
to origin.

Example:


```
git checkout v2.53.2
git checkout -b v2.53
git push -u
```

It is important that this branch gets it's own deploy branch condition. Modify .travis.yml
and change the branch name of `deploy: branch:` keys to new branch version you just created
(Exmple: v2.50).

Example of travis script (change vX.Y to your version - e.g. v2.50):

```
deploy:
  - provider: script
    script: gem install octokit && ruby github_release.rb
    skip_cleanup: true
    on:
      condition: $CI = true
      branch: vX.Y
```

Afterward, add, commit, and push changes (change vX.Y to your version - e.g. v2.50):

```
git add .travis.yml
git commit -m "Update deploy branch to stable release version vX.Y"
git push -u
```

In github RAUL repo go to settings -> branches (in the menu on the left) -> add rule and lock down
the version branch

* check "Require pull request reviews before merging"
  * under this option check "Require review from Code Owners"
  * under this option check "Restrict who can dismiss pull request reviews"
* check "Require status checks to pass before merging"
  * under this option check "Require branches to be up to date before merging"
  * under this option check " continuous-integration/travis-ci"
* check "Include administrators"
* check "Restrict who can push to matching branches"
  * under this option add any necessary exceptions

### Backport release workflow

The following shows how you should backport patches (bug fixes only) into a stable version.

* Cut branch from latest of the stable branch (e.g. `git fetch && git checkout v2.50 && git checkout -b v2.50.3-backport-v2.63.1`)
  * follow format: [new tag version]-backport-[patch version] - (e.g. v2.50.3-backport-v2.63.1)
* `git log` the patch version being backported and get the SHA of the squash commit (not the CI commit) which is usually second
* cherry-pick squash commit from future patch tag (e.g. `git cherry-pick [SHA]`)
* Create pull request against stable branch (v2.50 <- v2.50.3-backport-v2.63.1)
* Add `> backports vX.Y.Z` to notes

Example:

```
git checkout v2.50
git checkout -b v2.50.3-backport-v2.63.1
git log v2.63.1
git cherry-pick [SHA_COMMIT]
git push -u
```

In GITHUB, open pull request against stable version (NOT MASTER!) keep title and body,
but add `> backports vX.Y.Z`:

```
> backports v2.63.1`

## Bug Fixes

* notes
* notes
```

> Note title should already have the commit title from the patch being pulled in

Also just like the notes and title of the PR, when yuo are merging into stable version, make sure
you keep the notes (and title) in the same way as you had and just add the `> backports vX.Y.Z`
section as above.

After merge and successful build in travis, to release do the following:

1. Squash merge into stable
2. Checkout stable version (e.g. `git checkout v2.50`)
3. Git Pull
4. Update the CHANGELOG.md the same way a release would be updated (version etc)
5. Run `raul release`

## Helpful git commands:

```
# Verify section by section for the commit you want to make

git add -p
```

Add the following to ~/.gitconfig alias section to help you commit only whitespace
changes. This is especially usefull when deling with html indentation changes.

```
[alias]
    ws = ! git add . && (git diff --cached --color=never -w -b --ignore-blank-lines | git apply --cached -R)
```
