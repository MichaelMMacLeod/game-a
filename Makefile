debug:
	./node_modules/eslint/bin/eslint.js --fix src/
	browserify src/src.js > build/target.js

release:
	browserify src/src.js > build/target.js
