debug:
	./node_modules/eslint/bin/eslint.js --fix src/
	browserify src/module.js > build/target.js

release:
	browserify src/module.js > build/target.js
