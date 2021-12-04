# Testing

---

To test the API we use only cypress since we work with a browser API.

If you want to use the browser while testing you have to declare which kind of browser cypress should use. You do that by replacing ${BROWSER} in the package.json:

```javascript
"test:cypress-headed": "./node_modules/.bin/cypress run --headed --browser ${BROWSER} --no-exit "
```

GitLabCI runs the tests on a pipeline.
