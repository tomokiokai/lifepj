up:
	./vendor/bin/sail up -d
init:
	composer install
	cp .env.example .env
	chmod -R 777 storage bootstrap/cache
	@make up
	./vendor/bin/sail php artisan key:generate
	./vendor/bin/sail php artisan storage:link
	@make fresh
remake:
	@make destroy
	@make init
stop:
	./vendor/bin/sail stop
down:
	./vendor/bin/sail down
restart:
	./vendor/bin/sail restart
destroy:
	./vendor/bin/sail down --rmi all --volumes --remove-orphans
ps:
	./vendor/bin/sail ps
shell:
	./vendor/bin/sail shell
migrate:
	./vendor/bin/sail php artisan migrate
fresh:
	./vendor/bin/sail php artisan migrate:fresh --seed
seed:
	./vendor/bin/sail php artisan db:seed
test:
	./vendor/bin/sail php artisan test
npm-install:
	./vendor/bin/sail npm install
npm-watch:
	./vendor/bin/sail npm run watch
npm-watch-poll:
	./vendor/bin/sail npm run watch-poll
mysql:
	./vendor/bin/sail mysql
