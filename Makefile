debug:
	./node_modules/eslint/bin/eslint.js --fix src/
	./node_modules/browserify/bin/cmd.js src/src.js > build/target.js

release:
	./node_modules/browserify/bin/cmd.js src/src.js > build/target.js
