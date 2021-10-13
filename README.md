# Todo list
Todo list made with NodeJs express, mongodb & react hooks w/ mobx and styled components.

## how to run:
### with docker
#### prerequisites
	install docker desktop

run:

	docker-compose up
	go to http://localhost:8080 in browser

## without docker:
#### prerequisites
	install mongodb (and run it)
	install nodejs & npm

run:

	npm run build
	npm start
	go to http://localhost:8080 in browser

## how to run development:
	npm run dev
	(backend will run on port 8080)
& 

	cd app 
	npm start
	go to http://localhost:3000 in browser

## how to test
#### prerequisites
	install mongodb (and run it)
	install nodejs & npm

run:

	npm install
	export CI=1
	export LOG_LEVEL=silly // optional
	npm test
	open ./coverage/index.html // to see test coverage