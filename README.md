![Logo](docs/logo.png)

# musavisakisa

See related projects:

 * [ytmusicquiz][repo_ytmusicquiz] - Backend application: Admin UI, Game Master UI. Python / Django applcation.
 * [ytmusicquiz-dashboard][repo_ytmusicquiz_dashboard] - Game UI / Dashboard. React -application.
* [ytmusicquiz-deploy][repo_ytmusicquiz_deploy] - AWS Infrastructure as a code, written in Terraform.
* [ytmusicquiz-docs][repo_ytmusicquiz_docs] - Documentation: Written guidelines how to set up and develop the application.

# ytmusicquiz-dashboard

This repository contains the Game UI / Dashboard application that is written in [TypeScript][typescript] with [React-framework][react].

The application uses WebSocket-protocol for communicating in real-time to the backend server. To simplify, it uses [Redux][redux] state handling to react for events coming from the backend server. The dashboard does not have any user input as it is designed to show current game status to all players and work as an audio sink when the game needs to output audio.

[react]: https://reactjs.org/
[redux]: https://redux.js.org/
[typescript]: https://www.typescriptlang.org/
[repo_ytmusicquiz]: https://github.com/zcmander/ytmusicquiz/
[repo_ytmusicquiz_dashboard]: https://github.com/zcmander/ytmusicquiz-dashboard/
[repo_ytmusicquiz_deploy]: https://github.com/zcmander/ytmusicquiz-deploy/
[repo_ytmusicquiz_docs]: https://github.com/zcmander/ytmusicquiz-docs/