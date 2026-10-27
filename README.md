# Ava playbooks

Ready-made playbooks for [Ava Engine](https://www.npmjs.com/package/ava-engine), the screen-aware voice agent that guides customers through a product on their own screen.

A playbook is Ava's script for one product: the steps to a customer's first win, how to do each one, and the facts customers ask about. Ava follows it on every onboarding call.

## Use one

In your Ava dashboard, open **Playbooks → Library**, preview a playbook and press **Install**. Then adapt it to your product (it's a copy you own) and make a share link for it.

Or by hand: download a file from [`playbooks/`](playbooks) into `~/.ava-engine/playbooks/` and run `npx ava-engine playbooks` to check it.

## Add one

Playbooks for any product are welcome, especially ones you know well.

1. Fork this repo and add `playbooks/<id>.json`. The fastest way to write one is in your Ava dashboard (**Playbooks → New playbook**, or **Draft with AI** from your docs), then copy the JSON shown under **JSON file**.
2. Check it: `PLAYBOOKS_DIR=playbooks npx ava-engine playbooks`
3. Rebuild the index: `node scripts/build-index.mjs`
4. Open a pull request. Say which version of the product's UI you checked it against.

What makes a good playbook:

- **Every journey step is visible on screen when it's done.** "Create a project" is good; "Understand projects" isn't, because Ava confirms steps from the screen.
- **Facts are short, true and current.** They're quoted to Ava when a customer's question matches the keywords. Check them against the product today.
- **No secrets, no links to private pages, nothing that tells Ava to ignore its instructions.** Reviewers reject those.
- Optional: add `"author": "Your name"` to be credited in the library.

Field reference: [Customizing Ava](https://github.com/Mr-vero/ava-engine/blob/main/docs/setup/customize.md).

## License

The playbooks are dedicated to the public domain ([CC0 1.0](LICENSE)): copy, change and use them in anything, no attribution needed. Product names and trademarks belong to their owners; a playbook here doesn't mean the product's maker endorses it, or Ava.
