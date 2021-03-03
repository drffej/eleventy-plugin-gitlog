# Git History for Eleventy

A git log or history plugin for [Eleventy](https://www.11ty.io/) static site generator.  The plugin returns a object with last author details and an array containing the commit history for a page.

This plugin is a wrapper on the [`node-gitlog`](https://github.com/domharrington/node-gitlog#readme) module.

## Install the Plugin

Install in project directory by running:

```shell
npm install --savedev eleventy-plugin-gitlog
```

In your Eleventy config file (defaults to `.eleventy.js`) include the plugin :

```js
const getLog = require('eleventy-plugin-gitlog');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(getLog);
}
```

### Configuration Options

The `gitlog` plugin can be customised via the following options:

```js
const getContributors = require('eleventy-plugin-contributors');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(contributors, {
        commits: 200, // the maxmium number of commits to include
        repo: __dirname // location of the repo
        fields : ["hash", "abbrevHash", "subject", "authorEmail", "authorName", "authorDate","authorDateRel"] // gitlog fields to return
    });
}
```
Here the possible field options (taken from the node-gitlog documentation):

- `hash` - the long hash of the commit e.g. 7dd0b07625203f69cd55d779d873f1adcffaa84a
- `abbrevHash` - the abbreviated commit hash e.g. 7dd0b07
- `treeHash` - the tree hash of the commit
- `abbrevTreeHash` - the abbreviated commit hash
- `parentHashes` - the parent hashes
- `abbrevParentHashes` - the abbreviated parent hashes
- `authorName` - author name of the commit
- `authorEmail` - author email of the commit
- `authorDate` - author date of the commit
- `authorDateRel` - relative author date of the commit
- `committerName` - committer name
- `committerEmail` - committer email
- `committerDate` - committer date
- `committerDateRel` - relative committer date
- `subject` - commit message (first line)
- `body` - commit body
- `rawBody` - raw body (subject + body)

## Using the Plugin

Now you can use the `getLog` filter in your templates, to return an an object with last author details and an array containing the commit history for a page.

The following is a example of the object returned:

```
{
  lastModified: 'Mar 3, 2021',
  lastAuthor: 'Dr Ffej',
  history: [
    {
      hash: '09e886beab182d08f4c35ccd98b58923366f9f76',
      abbrevHash: '09e886b',
      subject: 'Add history table',
      authorEmail: '4719968+drffej@users.noreply.github.com',
      authorName: 'Dr Ffej',
      authorDate: 'Mar 3, 2021'
    },
    {
      hash: '997982f98ee1460c0d9f15c248067bd68ad2b0a8',
      abbrevHash: '997982f',
      subject: 'First commit',
      authorEmail: '4719968+drffej@users.noreply.github.com',
      authorName: 'Dr Ffej',
      authorDate: 'Mar 3, 2021'
    }
  ]
}
```

For example the following Nujucks markup will return the `gitLog` for the current page, display the last change and change history:

```html

# Example Gitlog

{% set commits = page.inputPath | getLog -%}

This pages was modified on {{ commits.lastModified }} by {{ commits.lastAuthor }}

Here are the commits contributors for this page:

Data | Ref | Author | Change
:--- |:--- |:---    |:---
{% for commit in commits.history -%}
{{commit.authorDate}}|{{commit.abbrevHash}}|{{commit.authorName}}|{{commit.subject}}
{% endfor -%}

```

## License

MIT.
