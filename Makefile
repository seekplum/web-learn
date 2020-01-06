eslint:
	cd ./node-learn && ./node_modules/.bin/eslint src --config=.eslintrc.json --format=checkstyle --output-file=./eslint_result.xml; cd -
	cd ./node-learn && ./node_modules/.bin/eslint ./src --config=.eslintrc.json --format=checkstyle -f node_modules/eslint-html-reporter/reporter.js -o eslint_result.html; if [ "`uname`" = "Darwin" ]; then sed -i "" "s#eslint.org#eslint.cn#g" eslint_result.html; else sed -i "s#eslint.org#eslint.cn#g" eslint_result.html; fi; cd -
