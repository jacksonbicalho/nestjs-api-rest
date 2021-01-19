# API REST In NestJS

gerar migrations com base em entidades:
ts-node ./node_modules/typeorm/cli.js migration:generate -n User

Executar migrations pendentes:
ts-node ./node_modules/typeorm/cli.js migration:run