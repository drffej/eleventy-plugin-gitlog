---
templateEngineOverride: njk,md
---
# Example Gitlog

{% set commits = page.inputPath | getLog -%}

This pages was modified on {{ commits.lastModified }} by {{ commits.lastAuthor }}

Here are the commits contributors for this page:

Data | Ref | Author | Change
:--- |:--- |:---    |:---
{% for commit in commits.history -%}
{{commit.authorDate}}|{{commit.abbrevHash}}|{{commit.authorName}}|{{commit.subject}}
{% endfor %}