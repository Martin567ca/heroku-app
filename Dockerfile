From node:12.18.3

Workdir /app

Copy ["package.json","package-lock.json","./"]

Run npm install

Copy . .

Expose 4000

Cmd ["node","server.js"]