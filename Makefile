REPORTER=list

.PHONY: test
test:
	mocha --reporter $(REPORTER)
